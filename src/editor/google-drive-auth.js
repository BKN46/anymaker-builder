export const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
export const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';
export const validGoogleClientId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{8,200}\.apps\.googleusercontent\.com$/.test(value);

let scriptPromise;
export function loadGoogleIdentity(document = globalThis.document, getOAuth = () => globalThis.google?.accounts?.oauth2) {
  if (getOAuth()) return Promise.resolve(getOAuth());
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const finish = (error) => {
      clearTimeout(timer); script.onload = null; script.onerror = null;
      if (error) { script.remove(); scriptPromise = null; reject(error); }
      else resolve(getOAuth());
    };
    const timer = setTimeout(() => finish(new Error('无法加载 Google 登录，请检查网络后重试')), 20000);
    script.src = GOOGLE_SCRIPT; script.async = true; script.defer = true;
    script.onload = () => finish(getOAuth() ? null : new Error('无法加载 Google 登录，请检查网络后重试'));
    script.onerror = () => finish(new Error('无法加载 Google 登录，请检查网络后重试'));
    document.head.append(script);
  });
  return scriptPromise;
}

// Tokens belong only to this page session. Call authorize directly from a click.
export function createGoogleDriveAuth({ clientId, oauth, now = Date.now }) {
  if (!validGoogleClientId(clientId)) throw new Error('请配置有效的 Google OAuth Client ID');
  let token = ''; let expiresAt = 0; let pending = null;
  const settle = (error, value) => {
    const current = pending; pending = null;
    if (!current) return;
    clearTimeout(current.timer);
    if (error) current.reject(error); else current.resolve(value);
  };
  const makeClient = attempt => oauth.initTokenClient({
    client_id: clientId, scope: DRIVE_SCOPE, include_granted_scopes: false,
    callback: response => {
      if (pending !== attempt) return;
      if (response.error) { settle(new Error('Google 授权未完成，请重新登录')); return; }
      if (!oauth.hasGrantedAllScopes(response, DRIVE_SCOPE)) { settle(new Error('需要允许访问本应用的 Google 云盘文件')); return; }
      const seconds = Number(response.expires_in);
      if (typeof response.access_token !== 'string' || !response.access_token || !Number.isFinite(seconds) || seconds <= 30) { settle(new Error('Google 授权响应无效')); return; }
      token = response.access_token; expiresAt = now() + (seconds - 30) * 1000;
      settle(null, token);
    },
    error_callback: () => { if (pending === attempt) settle(new Error('Google 登录窗口已关闭或被拦截，请允许弹窗后重试')); },
  });
  return {
    authorize() {
      if (token && now() < expiresAt) return Promise.resolve(token);
      if (pending) return pending.promise;
      const promise = new Promise((resolve, reject) => {
        pending = { resolve, reject, timer: setTimeout(() => settle(new Error('Google 登录超时，请重试')), 120000) };
      });
      pending.promise = promise;
      try { makeClient(pending).requestAccessToken({ prompt: 'select_account' }); } catch { settle(new Error('Google 登录窗口已关闭或被拦截，请允许弹窗后重试')); }
      return promise;
    },
    isAuthorized: () => Boolean(token && now() < expiresAt),
    invalidate() { token = ''; expiresAt = 0; },
    disconnect() {
      const old = token; token = ''; expiresAt = 0;
      settle(new Error('Google 连接已断开'));
      if (old) { try { oauth.revoke(old, () => {}); } catch { /* The local token is already discarded. */ } }
    },
  };
}
