import { englishMessages } from './locales/en.js';

let locale = 'en';
const parameters = new WeakMap();
const messages = new Map(Object.entries(englishMessages));

export function addMessages(entries) {
  for (const [key, value] of Object.entries(entries)) if (typeof value === 'string') messages.set(key, value);
}
export function getLocale() { return locale; }
export function setLocale(value) { locale = value === 'zh' ? 'zh' : 'en'; }

function templateMatch(source) {
  for (const [key, template] of messages) {
    if (!key.includes('{')) continue;
    const names = [];
    let cursor = 0;
    let expression = '^';
    for (const placeholder of key.matchAll(/\{([A-Za-z][\w]*)\}/g)) {
      expression += key.slice(cursor, placeholder.index).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expression += '([\\s\\S]*?)';
      names.push(placeholder[1]);
      cursor = placeholder.index + placeholder[0].length;
    }
    expression += key.slice(cursor).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
    const match = new RegExp(expression).exec(source);
    if (match) return { template, values: Object.fromEntries(names.map((name, index) => [name, match[index + 1]])) };
  }
  return null;
}

export function t(key, params = {}) {
  const source = String(key ?? '');
  const values = typeof params === 'function' ? params() : params;
  if (locale === 'zh') return source.replace(/\{([A-Za-z][\w]*)\}/g, (match, name) => Object.hasOwn(values || {}, name) ? String(values[name] ?? '') : match);
  const exact = messages.get(source);
  const matched = exact ? null : templateMatch(source);
  const template = exact ?? matched?.template ?? source;
  const resolved = { ...matched?.values, ...(values || {}) };
  return template.replace(/\{([A-Za-z][\w]*)\}/g, (match, name) => Object.hasOwn(resolved, name) ? String(resolved[name] ?? '') : match);
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
