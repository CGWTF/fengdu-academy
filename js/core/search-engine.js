/**
 * 搜索引擎
 * 关键词 -> 页面映射，前端实现
 *
 * 输入规则：中文、数字、英文字母、短横线，长度 2-24
 */
const SearchEngine = {
  _index: null,
  _pages: null,

  init(pagesData) {
    this._pages = pagesData;
    this._buildIndex();
  },

  _buildIndex() {
    this._index = {};
    Object.values(this._pages).forEach(page => {
      if (page.keywords && Array.isArray(page.keywords)) {
        page.keywords.forEach(kw => {
          const key = kw.trim();
          if (key) {
            this._index[key] = page.id;
          }
        });
      }
    });
  },

  /**
   * 验证搜索关键词
   * 允许：中文、数字、英文字母、短横线，长度 2-24
   */
  isValidKeyword(keyword) {
    const trimmed = keyword.trim();
    if (trimmed.length < 2 || trimmed.length > 24) return false;
    return /^[一-鿿㐀-䶿a-zA-Z0-9\-]+$/.test(trimmed);
  },

  /**
   * 搜索关键词
   * @returns {{ pageId: string, page: object } | null}
   */
  search(keyword) {
    const kw = keyword.trim();
    if (!kw || !this.isValidKeyword(kw)) return null;

    // 精确匹配
    if (this._index[kw]) {
      return { pageId: this._index[kw], page: this._pages[this._index[kw]] };
    }

    return null;
  },

  /**
   * 检查是否有权限访问该页面
   * @returns {{ allowed: boolean, reason: string }}
   */
  checkAccess(page, currentLevel) {
    if (!page) return { allowed: false, reason: '页面不存在' };

    // 隐藏页面：必须通过搜索发现
    if (page.hidden && !GameState.hasFoundPage(page.id)) {
      // 但如果是搜索触发的，允许访问
      // 实际控制在 router.js 中通过 foundPages 检查
    }

    // 权限检查
    if (currentLevel < page.requiredLevel) {
      return { allowed: false, reason: '权限不足' };
    }

    return { allowed: true, reason: '' };
  },

  getPage(pageId) {
    return this._pages[pageId] || null;
  },

  getAllPages() {
    return Object.values(this._pages);
  },

  getVisiblePages() {
    return Object.values(this._pages).filter(p => !p.hidden);
  },

  getHiddenPages() {
    return Object.values(this._pages).filter(p => p.hidden);
  },

  getTotalPageCount() {
    return Object.keys(this._pages).length;
  }
};
