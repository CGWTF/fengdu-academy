const StoryData = {
  _loaded: false,
  pages: {},
  courses: {},
  accounts: {},
  people: {},
  clues: {},
  searchIndex: { entries: [] },

  load() {
    this.pages = this._decodeUrls(window.STORY_DATA_PAGES || {});
    this.courses = window.STORY_DATA_COURSES || {};
    this.accounts = window.STORY_DATA_ACCOUNTS || {};
    this.people = window.STORY_DATA_PEOPLE || {};
    this.clues = window.STORY_DATA_CLUES || {};
    this.searchIndex = window.STORY_DATA_SEARCH_INDEX || { entries: [] };
    this._loaded = true;
    return true;
  },

  _decodeUrls(pages) {
    const decoded = {};
    Object.entries(pages).forEach(([key, page]) => {
      decoded[key] = { ...page };
      if (page.url) {
        try { decoded[key].url = atob(page.url); } catch (e) { /* keep raw if not base64 */ }
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
  }
};
