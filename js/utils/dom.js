/**
 * DOM 快捷工具
 * 迷你 jQuery-like 选择器，无依赖
 */
const $ = (selector, parent) => (parent || document).querySelector(selector);
const $$ = (selector, parent) => [...(parent || document).querySelectorAll(selector)];

const on = (el, event, fn) => el.addEventListener(event, fn);
const ready = (fn) => document.addEventListener('DOMContentLoaded', fn);

// 创建元素
const create = (tag, attrs = {}, html = '') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') el.className = v;
    else if (k === 'dataset') Object.entries(v).forEach(([dk, dv]) => el.dataset[dk] = dv);
    else el.setAttribute(k, v);
  });
  if (html) el.innerHTML = html;
  return el;
};
