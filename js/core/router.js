const Router = {
  pageId: '',
  requiredLevel: 0,
  isHidden: false,

  init() {
    const body = document.body;
    this.pageId = body.dataset.pageId || '';
    this.requiredLevel = Number(body.dataset.requiredLevel || 0);
    this.isHidden = body.dataset.isHidden === 'true';

    const exempt = ['index', 'login', 'search'];
    if (exempt.includes(this.pageId)) return true;

    const state = GameState.getState();
    const base = Layout.basePath();

    if (this.isHidden && !GameState.hasFoundPage(this.pageId)) {
      window.location.href = base + 'search.html?locked=1';
      return false;
    }

    if (state.level < this.requiredLevel) {
      window.location.href = base + 'login.html?reason=level&required=' + this.requiredLevel;
      return false;
    }

    GameState.foundPage(this.pageId);
    return true;
  },
};
