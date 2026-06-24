/**
 * 游戏状态管理器
 * localStorage key: arg_game_save
 */
const GameState = {
  _state: null,
  _saveKey: 'game_save',

  _defaultState() {
    return {
      started: true,
      playerName: '',
      playerBirthday: '',
      currentAccount: 'player',
      level: 0,
      foundPages: {},
      searchHistory: [],
      cluesFound: [],
      puzzlesSolved: [],
      flags: {},
      createdAt: null,
      lastSaved: null
    };
  },

  init() {
    const saved = Storage.get(this._saveKey);
    if (saved && saved.started) {
      this._state = { ...this._defaultState(), ...saved };
      // 确保关键字段存在
      if (!this._state.foundPages) this._state.foundPages = {};
      if (!this._state.searchHistory) this._state.searchHistory = [];
      if (!this._state.cluesFound) this._state.cluesFound = [];
    } else {
      this._state = this._defaultState();
      this._state.createdAt = new Date().toISOString();
      this.save();
    }
    return this._state;
  },

  save() {
    this._state.lastSaved = new Date().toISOString();
    Storage.set(this._saveKey, this._state);
  },

  reset() {
    Storage.remove(this._saveKey);
    this._state = this._defaultState();
    this._state.createdAt = new Date().toISOString();
    this.save();
  },

  // 账号
  setPlayer(name, birthday) {
    this._state.playerName = name;
    this._state.playerBirthday = birthday;
    this._state.currentAccount = 'player';
    this._state.level = 0;
    this.save();
  },

  switchAccount(accountId, level) {
    this._state.currentAccount = accountId;
    this._state.level = level;
    this.save();
  },

  // 页面发现
  foundPage(pageId) {
    if (!this._state.foundPages[pageId]) {
      this._state.foundPages[pageId] = new Date().toISOString();
      this.save();
      return true;
    }
    return false;
  },

  hasFoundPage(pageId) {
    return !!this._state.foundPages[pageId];
  },

  // 搜索记录
  logSearch(keyword, result) {
    const entry = { keyword, timestamp: new Date().toISOString(), result };
    this._state.searchHistory.push(entry);
    this.save();
    return entry;
  },

  // 线索
  findClue(clueId) {
    if (!this._state.cluesFound.includes(clueId)) {
      this._state.cluesFound.push(clueId);
      this.save();
      return true;
    }
    return false;
  },

  // 标记
  setFlag(key, value) {
    this._state.flags[key] = value;
    this.save();
  },

  getFlag(key) {
    return this._state.flags[key];
  },

  // 进度
  getFoundCount() {
    return Object.keys(this._state.foundPages).length;
  },

  getTotalPages() {
    // 从 pages.json 统计（由 story-data 注入）
    return window._totalPageCount || 15;
  },

  getSummary() {
    return {
      account: this._state.currentAccount,
      level: this._state.level,
      foundPages: Object.keys(this._state.foundPages),
      foundCount: Object.keys(this._state.foundPages).length,
      totalPages: this.getTotalPages(),
      searches: this._state.searchHistory.length,
      clues: this._state.cluesFound
    };
  },

  // 导出导入
  export() {
    return JSON.stringify(this._state, null, 2);
  },

  import(json) {
    try {
      const data = JSON.parse(json);
      if (!data || typeof data !== 'object') throw new Error('Invalid save');
      if (!data.hasOwnProperty('started')) throw new Error('Missing required field');
      this._state = { ...this._defaultState(), ...data };
      this.save();
      return true;
    } catch (e) {
      console.error('导入存档失败:', e);
      return false;
    }
  },

  getState() {
    return this._state;
  }
};
