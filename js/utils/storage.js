/**
 * localStorage 类型化封装
 * 自动 JSON 序列化/反序列化，带错误处理
 */
const Storage = {
  _prefix: 'arg_',

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this._prefix + key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage.get 失败:', key, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this._prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage.set 失败:', key, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(this._prefix + key);
    } catch (e) {
      console.warn('Storage.remove 失败:', key, e);
    }
  },

  clear() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith(this._prefix)) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Storage.clear 失败:', e);
    }
  }
};
