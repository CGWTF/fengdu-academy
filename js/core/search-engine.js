const SearchEngine = {
  entries: [],
  pages: {},

  init(searchIndexOrPages, pagesMaybe) {
    if (searchIndexOrPages && Array.isArray(searchIndexOrPages.entries)) {
      this.entries = searchIndexOrPages.entries;
      this.pages = pagesMaybe || StoryData.pages || {};
    } else {
      this.pages = searchIndexOrPages || StoryData.pages || {};
      this.entries = [];
      Object.values(this.pages).forEach(page => {
        (page.keywords || []).forEach(keyword => {
          this.entries.push({
            keyword,
            aliases: [],
            targetPageId: page.id,
            requiredLevel: page.requiredLevel || 0,
            unlockMode: 'exact'
          });
        });
      });
    }
  },

  normalize(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
      .replace(/\s+/g, '');
  },

  isValidKeyword(keyword) {
    const trimmed = String(keyword || '').trim();
    if (trimmed.length < 2 || trimmed.length > 24) return false;
    return /^[\u4e00-\u9fffA-Za-z0-9\-_\s]+$/.test(trimmed);
  },

  search(keyword, currentLevel) {
    const raw = String(keyword || '').trim();
    if (!this.isValidKeyword(raw)) {
      return { resultType: 'invalid', keyword: raw, matches: [] };
    }

    const normalized = this.normalize(raw);
    const level = Number(currentLevel || 0);
    const exact = this.entries.find(entry => this._tokens(entry).some(token => token === normalized));

    if (exact) return this._buildResult(raw, normalized, exact, 'exact', level);

    const fuzzyMatches = this.entries
      .filter(entry => this._tokens(entry).some(token => token.includes(normalized) || normalized.includes(token)))
      .map(entry => this._buildMatch(entry));

    if (fuzzyMatches.length) {
      const first = fuzzyMatches[0];
      const entry = this.entries.find(e => e.targetPageId === first.pageId && e.keyword === first.keyword);
      if (entry && entry.unlockMode === 'fuzzy') {
        return this._buildResult(raw, normalized, entry, 'fuzzy', level);
      }
      return {
        resultType: 'fuzzy',
        keyword: raw,
        normalized,
        matches: fuzzyMatches,
        requiredLevel: Math.min(...fuzzyMatches.map(m => m.requiredLevel || 0))
      };
    }

    return { resultType: 'none', keyword: raw, normalized, matches: [] };
  },

  _buildResult(raw, normalized, entry, hitType, level) {
    const page = this.pages[entry.targetPageId] || null;
    const requiredLevel = Number(entry.requiredLevel ?? page?.requiredLevel ?? 0);
    if (level < requiredLevel) {
      return {
        resultType: 'blocked',
        keyword: raw,
        normalized,
        page,
        pageId: entry.targetPageId,
        requiredLevel,
        matches: [this._buildMatch(entry)]
      };
    }
    return {
      resultType: hitType === 'exact' ? 'exact' : 'fuzzy-open',
      keyword: raw,
      normalized,
      page,
      pageId: entry.targetPageId,
      requiredLevel,
      matches: [this._buildMatch(entry)]
    };
  },

  _buildMatch(entry) {
    const page = this.pages[entry.targetPageId] || {};
    return {
      keyword: entry.keyword,
      pageId: entry.targetPageId,
      title: page.title || entry.keyword,
      url: page.url || '#',
      requiredLevel: Number(entry.requiredLevel ?? page.requiredLevel ?? 0),
      unlockMode: entry.unlockMode || 'exact'
    };
  },

  _tokens(entry) {
    return [entry.keyword].concat(entry.aliases || []).map(token => this.normalize(token)).filter(Boolean);
  }
};
