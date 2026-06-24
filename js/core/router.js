/**
 * 页面路由与访问控制
 * 每个页面 <body> 必须声明:
 *   data-page-id="..."
 *   data-required-level="0|1|2"
 *   data-is-hidden="true|false"
 */
const Router = {
  pageId: '',
  requiredLevel: 0,
  isHidden: false,

  init() {
    const body = document.body;
    this.pageId = body.dataset.pageId || '';
    this.requiredLevel = parseInt(body.dataset.requiredLevel) || 0;
    this.isHidden = body.dataset.isHidden === 'true';

    const state = GameState.getState();
    const currentLevel = state.level;

    // 特殊页面不检查（入口页、搜索页）
    if (this.pageId === 'index' || this.pageId === 'search') {
      return;
    }

    // 隐藏页面检查：必须已经通过搜索发现
    if (this.isHidden && !GameState.hasFoundPage(this.pageId)) {
      console.warn(`隐藏页面 ${this.pageId} 未被发现，重定向`);
      window.location.href = 'search.html?locked=1';
      return;
    }

    // 权限检查
    if (currentLevel < this.requiredLevel) {
      console.warn(`权限不足: 需要 Lv${this.requiredLevel}, 当前 Lv${currentLevel}`);
      window.location.href = 'home.html?error=permission';
      return;
    }

    // 记录页面访问
    GameState.foundPage(this.pageId);
  },

  /**
   * 检查是否能直接导航到指定页面
   */
  canAccess(pageId) {
    const pages = window._storyPages || {};
    const page = pages[pageId];
    if (!page) return false;

    const state = GameState.getState();
    if (page.hidden && !GameState.hasFoundPage(pageId)) return false;
    if (state.level < page.requiredLevel) return false;
    return true;
  }
};
