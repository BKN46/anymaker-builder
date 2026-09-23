import { englishMessages } from './locales/en.js';

let locale = 'en';
const parameters = new WeakMap();
const messages = new Map(Object.entries(englishMessages));

export function addMessages(entries) {
  for (const [key, value] of Object.entries(entries)) if (typeof value === 'string') messages.set(key, value);
}
export function getLocale() { return locale; }
export function setLocale(value) { locale = value === 'zh' ? 'zh' : 'en'; }
export function t(key, params = {}) {
  const source = String(key ?? '');
  const template = locale === 'zh' ? source : messages.get(source) ?? source;
  const values = typeof params === 'function' ? params() : params;
  return template.replace(/\{([A-Za-z][\w]*)\}/g, (match, name) => Object.hasOwn(values || {}, name) ? String(values[name] ?? '') : match);
}
export function setText(element, key, params = {}) {
  element.dataset.i18n = key;
  parameters.set(element, params);
  element.textContent = t(key, params);
}
export function applyTranslations(root = document) {
  const selector = '[data-i18n], [data-i18n-title], [data-i18n-aria-label], [data-i18n-placeholder]';
  const elements = [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];
  for (const element of elements) {
    if (element.hasAttribute('data-i18n')) element.textContent = t(element.dataset.i18n, parameters.get(element));
    for (const [attribute, key] of [['title', 'i18nTitle'], ['aria-label', 'i18nAriaLabel'], ['placeholder', 'i18nPlaceholder']]) {
      if (element.dataset[key] !== undefined) element.setAttribute(attribute, t(element.dataset[key]));
    }
  }
}
