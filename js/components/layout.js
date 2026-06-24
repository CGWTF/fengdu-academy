const Layout = {
  basePath() {
    const path = window.location.pathname;
    return (path.includes('/hidden/') || path.includes('/student/') || path.includes('/teacher/')) ? '../' : '';
  },

  init(pageTitle, breadcrumb) {
    const pageId = document.body.dataset.pageId || '';
    if (pageId !== 'index' && !sessionStorage.getItem('ad_passed')) {
      window.location.href = this.basePath() + 'index.html?gate=1';
      return;
    }
    GameState.init();
    StoryData.load();
    SearchEngine.init(StoryData.searchIndex, StoryData.pages);
    this.renderHeader(pageTitle, breadcrumb);
    this.renderFooter();
    Router.init();
  },

  renderHeader(pageTitle, breadcrumb) {
    const header = document.getElementById('app-header');
    if (!header) return;
    const base = this.basePath();
    const state = GameState.getState();
    const account = AccountManager.getCurrentLabel();

    header.innerHTML = `
      <header class="site-header">
        <div class="logo">酆都在线学院</div>
        <div class="subtitle">学生管理系统 v3.7.1</div>
        <nav class="site-nav">
          <a href="${base}home.html">主页</a>
          <a href="${base}courses.html">课程</a>
          <a href="${base}students.html">学生</a>
          <a href="${base}search.html">搜索记录</a>
          <a href="${base}login.html">账号</a>
          <a href="${base}admin.html">后台</a>
          <span class="account-chip">${this.escape(account)} · Lv${state.level}</span>
        </nav>
      </header>
      <form class="search-bar" id="global-search-form">
        <input type="text" id="search-input" placeholder="档案检索" maxlength="24" autocomplete="off">
        <button type="submit">检索</button>
      </form>
      ${pageTitle ? `<div class="page-title-bar"><span class="page-title">${this.escape(pageTitle)}</span>${breadcrumb ? `<span class="page-breadcrumb">${this.escape(breadcrumb)}</span>` : ''}</div>` : ''}
    `;

    const form = document.getElementById('global-search-form');
    if (form) {
      form.addEventListener('submit', event => {
        event.preventDefault();
        this.doSearch();
      });
    }
  },

  renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;
    const summary = GameState.getSummary();
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-content">
          <span>已发现 ${summary.foundCount}/${summary.totalPages || '-'} 个页面</span>
          <span class="footer-divider">|</span>
          <span>检索记录 ${summary.searches} 条</span>
          <span class="footer-divider">|</span>
          <span>内部系统，请勿外传</span>
        </div>
      </footer>
    `;
  },

  doSearch() {
    const input = document.getElementById('search-input');
    const keyword = input ? input.value.trim() : '';
    if (!keyword) return;
    const base = this.basePath();
    const state = GameState.getState();
    const result = SearchEngine.search(keyword, state.level);
    const params = new URLSearchParams({ q: keyword, type: result.resultType });

    if (['exact', 'fuzzy-open'].includes(result.resultType) && result.page) {
      if (result.page.hidden) GameState.foundPage(result.page.id);
      GameState.logSearch({
        keyword,
        resultType: result.resultType,
        resultPageId: result.page.id,
        requiredLevel: result.requiredLevel
      });
      if (result.page.id === 'search') {
        params.set('type', result.resultType);
        window.location.href = base + 'search.html?' + params.toString();
        return;
      }
      window.location.href = base + result.page.url;
      return;
    }

    if (result.resultType === 'blocked') {
      GameState.logSearch({
        keyword,
        resultType: 'blocked',
        resultPageId: result.pageId,
        requiredLevel: result.requiredLevel
      });
      params.set('required', result.requiredLevel);
      params.set('page', result.pageId);
      window.location.href = base + 'search.html?' + params.toString();
      return;
    }

    GameState.logSearch({
      keyword,
      resultType: result.resultType,
      resultPageId: result.matches?.[0]?.pageId || null,
      requiredLevel: result.requiredLevel || 0
    });
    window.location.href = base + 'search.html?' + params.toString();
  },

  renderSearchHistory(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const history = GameState.getState().searchHistory.slice(-12).reverse();
    if (!history.length) {
      container.innerHTML = '<p class="muted">暂无搜索记录。</p>';
      return;
    }
    container.innerHTML = history.map(item => `
      <div class="history-item">
        <span>${this.escape(item.keyword)}</span>
        <small>${this.labelResult(item.resultType)}${item.requiredLevel ? ` · Lv${item.requiredLevel}` : ''}</small>
      </div>
    `).join('');
  },

  labelResult(type) {
    return ({
      exact: '已打开',
      'fuzzy-open': '已打开',
      fuzzy: '近似记录',
      blocked: '权限不足',
      none: '无结果',
      invalid: '格式无效'
    })[type] || type;
  },

  escape(value) {
    const div = document.createElement('div');
    div.textContent = String(value ?? '');
    return div.innerHTML;
  }
};
