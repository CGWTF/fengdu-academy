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
      accountsUsed: ['player'],
      blockedAttempts: [],
      flags: {},
      createdAt: null,
      lastSaved: null
    };
  },

  init() {
    const saved = Storage.get(this._saveKey);
    if (saved && saved.started) {
      this._state = { ...this._defaultState(), ...saved };
      this._state.foundPages = this._state.foundPages || {};
      this._state.searchHistory = this._state.searchHistory || [];
      this._state.cluesFound = this._state.cluesFound || [];
      this._state.accountsUsed = this._state.accountsUsed || ['player'];
      this._state.blockedAttempts = this._state.blockedAttempts || [];
      this._state.flags = this._state.flags || {};
    } else {
      this._state = this._defaultState();
      this._state.createdAt = new Date().toISOString();
      this.save();
    }
    return this._state;
  },

  save() {
    if (!this._state) this.init();
    this._state.lastSaved = new Date().toISOString();
    Storage.set(this._saveKey, this._state);
  },

  reset() {
    Storage.remove(this._saveKey);
    this._state = this._defaultState();
    this._state.createdAt = new Date().toISOString();
    this.save();
  },

  setPlayer(name, birthday) {
    this._state.playerName = name;
    this._state.playerBirthday = birthday;
    this._state.currentAccount = 'player';
    this._state.level = 0;
    this.markAccountUsed('player');
    this.save();
  },

  switchAccount(accountId, level) {
    this._state.currentAccount = accountId;
    this._state.level = level;
    this.markAccountUsed(accountId);
    this.save();
  },

  markAccountUsed(accountId) {
    if (!this._state.accountsUsed.includes(accountId)) {
      this._state.accountsUsed.push(accountId);
    }
  },

  foundPage(pageId) {
    if (!pageId) return false;
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

  logSearch(entry) {
    const normalized = typeof SearchEngine !== 'undefined'
      ? SearchEngine.normalize(entry.keyword || '')
      : (entry.keyword || '').trim();
    const record = {
      keyword: entry.keyword || '',
      normalized,
      timestamp: new Date().toISOString(),
      resultType: entry.resultType || 'none',
      resultPageId: entry.resultPageId || null,
      requiredLevel: entry.requiredLevel || 0
    };
    this._state.searchHistory.push(record);
    if (record.resultType === 'blocked') this._state.blockedAttempts.push(record);
    this.save();
    return record;
  },

  findClue(clueId) {
    if (!this._state.cluesFound.includes(clueId)) {
      this._state.cluesFound.push(clueId);
      this.save();
      return true;
    }
    return false;
  },

  setFlag(key, value = true) {
    this._state.flags[key] = value;
    this.save();
  },

  getFlag(key) {
    return this._state.flags[key];
  },

  getState() {
    if (!this._state) this.init();
    return this._state;
  },

  getTotalPages() {
    if (typeof StoryData !== 'undefined' && StoryData._loaded) {
      return StoryData.getTotalPageCount();
    }
    return 0;
  },

  getSummary() {
    return {
      account: this._state.currentAccount,
      level: this._state.level,
      foundCount: Object.keys(this._state.foundPages).length,
      totalPages: this.getTotalPages(),
      searches: this._state.searchHistory.length,
      clues: this._state.cluesFound.length
    };
  },

  export() {
    return JSON.stringify(this._state, null, 2);
  },

  import(json) {
    try {
      const data = JSON.parse(json);
      if (!data || typeof data !== 'object' || !data.started) {
        throw new Error('Invalid save');
      }
      this._state = { ...this._defaultState(), ...data };
      this.save();
      return true;
    } catch (e) {
      console.error('Save import failed:', e);
      return false;
    }
  }
};
