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
    const isManagement = state.level >= 5;
    const visibleBreadcrumb = this.visibleBreadcrumb(breadcrumb, state.level);

    header.innerHTML = `
      <header class="site-header">
        <div class="logo">酆都在线学院</div>
        <div class="subtitle">学生管理系统 v3.7.1</div>
        <nav class="site-nav">
          <a href="${base}home.html">主页</a>
          <a href="${base}courses.html">课程</a>
          <a href="${base}students.html">学生</a>
          <a href="${base}search.html">搜索记录</a>
          <details class="cg-menu">
            <summary>CG</summary>
            <div class="cg-menu-panel">
              <span class="cg-account">${this.escape(account)}</span>
              ${isManagement ? `<span class="cg-level">管理层 · Lv${state.level}</span>` : ''}
              <a href="${base}login.html">账号切换</a>
              ${isManagement ? `<a href="${base}admin.html">管理后台</a>` : ''}
            </div>
          </details>
        </nav>
      </header>
      <form class="search-bar" id="global-search-form">
        <input type="text" id="search-input" placeholder="档案检索" maxlength="24" autocomplete="off">
        <button type="submit">检索</button>
      </form>
      ${pageTitle ? `<div class="page-title-bar"><span class="page-title">${this.escape(pageTitle)}</span>${visibleBreadcrumb ? `<span class="page-breadcrumb">${this.escape(visibleBreadcrumb)}</span>` : ''}</div>` : ''}
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
    const state = GameState.getState();
    const history = state.searchHistory.slice(-12).reverse();
    const isManagement = state.level >= 5;
    if (!history.length) {
      container.innerHTML = '<p class="muted">暂无搜索记录。</p>';
      return;
    }
    container.innerHTML = history.map(item => `
      <div class="history-item">
        <span>${this.escape(item.keyword)}</span>
        <small>${this.labelResult(item.resultType)}${isManagement && item.requiredLevel ? ` · Lv${item.requiredLevel}` : ''}</small>
      </div>
    `).join('');
  },

  visibleBreadcrumb(breadcrumb, level) {
    if (!breadcrumb) return '';
    const text = String(breadcrumb);
    if (level < 4 && /^Lv/i.test(text.trim())) return '';
    return text;
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
