/**
 * 故事数据加载器
 * 从 data/index.js 内联数据中加载，避免 file:// 下 fetch CORS 问题
 * 数据在页面中通过 <script src="data/index.js"> 预先加载
 */
const StoryData = {
  _loaded: false,

  load() {
    if (typeof STORY_DATA_PAGES === 'undefined') {
      console.error('数据未加载：请确保 data/index.js 在 story-data.js 之前引入');
      return false;
    }
    this.pages = STORY_DATA_PAGES;
    this.courses = STORY_DATA_COURSES || {};
    this.accounts = STORY_DATA_ACCOUNTS || {};
    this.clues = STORY_DATA_CLUES || {};
    this._loaded = true;
    return true;
  },

  getPage(id) { return this.pages[id] || null; },
  getCourse(id) { return this.courses[id] || null; },
  getAccount(id) { return this.accounts[id] || null; },
  getClue(id) { return this.clues[id] || null; },

  getCourseList() {
    return Object.values(this.courses).sort((a, b) => a.id.localeCompare(b.id));
  },

  getAccountList() {
    return Object.values(this.accounts);
  },

  getCluesForPage(pageId) {
    return Object.values(this.clues).filter(c => c.pageId === pageId);
  },

  getTotalPageCount() {
    return Object.keys(this.pages).length;
  }
};
