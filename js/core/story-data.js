const StoryData = {
  _loaded: false,
  pages: {},
  courses: {},
  accounts: {},
  people: {},
  clues: {},
  searchIndex: { entries: [] },

  load() {
    this.pages = this._decodeUrls(window.STORY_DATA_PAGES || {}, 'url');
    this.courses = this._decodeUrls(window.STORY_DATA_COURSES || {}, 'url');
    this.accounts = window.STORY_DATA_ACCOUNTS || {};
    this.people = this._decodeUrls(window.STORY_DATA_PEOPLE || {}, 'profilePage');
    this.clues = window.STORY_DATA_CLUES || {};
    this.searchIndex = window.STORY_DATA_SEARCH_INDEX || { entries: [] };
    this._loaded = true;
    return true;
  },

  _decodeUrls(obj, field) {
    const decoded = {};
    Object.entries(obj).forEach(([key, val]) => {
      decoded[key] = { ...val };
      if (decoded[key][field]) {
        try { decoded[key][field] = atob(decoded[key][field]); } catch (e) {}
      }
    });
    return decoded;
  },

  getPage(id) { return this.pages[id] || null; },
  getCourse(id) { return this.courses[id] || null; },
  getAccount(id) { return this.accounts[id] || null; },
  getPerson(id) { return this.people[id] || null; },
  getClue(id) { return this.clues[id] || null; },

  getCourseList() {
    return Object.values(this.courses).sort((a, b) => a.id.localeCompare(b.id));
  },

  getPeopleByType(type) {
    return Object.values(this.people).filter(p => p.type === type);
  },

  getCluesForPage(pageId) {
    return Object.values(this.clues).filter(c => c.pageId === pageId);
  },

  getTotalPageCount() {
    return Object.keys(this.pages).length;
  },

  // 根据学分计算等级
  levelFromCredits(credits) {
    if (credits >= 10) return 3;
    if (credits >= 7) return 2;
    if (credits >= 4) return 1;
    return 0;
  }
};
