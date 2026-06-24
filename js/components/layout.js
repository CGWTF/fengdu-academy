/**
 * 共享布局组件
 * 渲染 Header（含搜索框）+ Footer（含页码）+ 账号切换弹窗
 */
const Layout = {
  // 自动检测 base 路径（hidden 目录下的页面需要 ../ 前缀）
  _base: (function() {
    var path = window.location.pathname;
    return (path.indexOf('/hidden/') !== -1) ? '../' : '';
  })(),

  renderHeader(pageTitle, breadcrumb) {
    const header = document.getElementById('app-header');
    if (!header) return;

    var B = this._base;
    const state = GameState.getState();
    const accountName = state.playerName || '新生';

    header.innerHTML = `
      <header class="site-header">
        <div class="logo">酆都在线学院</div>
        <div class="subtitle">学生管理系统 v3.7.1</div>
        <nav class="site-nav">
          <a href="${B}home.html">🏠 主页</a>
          <a href="${B}courses.html">📚 选课</a>
          <a href="${B}roster.html">👥 名单</a>
          <a href="${B}admin.html" class="nav-admin">⚙️ 管理</a>
          <a href="#" onclick="Layout.showAccountModal();return false;" id="nav-account">
            👤 ${this._escape(accountName)} <span class="level-badge">Lv${state.level}</span>
          </a>
        </nav>
      </header>
      <div class="search-bar">
        <input type="text" id="search-input"
               placeholder="输入关键词搜索档案…"
               maxlength="24"
               autocomplete="off">
        <button id="search-btn" onclick="Layout.doSearch()">🔍 搜索</button>
      </div>
      ${pageTitle ? `<div class="page-title-bar">
        <span class="page-title">${pageTitle}</span>
        ${breadcrumb ? `<span class="page-breadcrumb">${breadcrumb}</span>` : ''}
      </div>` : ''}
    `;

    // 搜索事件绑定
    const input = document.getElementById('search-input');
    const btn = document.getElementById('search-btn');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') Layout.doSearch();
      });
    }
  },

  renderFooter(pageNum, totalPages) {
    const footer = document.getElementById('app-footer');
    if (!footer) return;
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-content">
          <span>档案编号：${pageNum || '—'} / ${totalPages || '—'}</span>
          <span class="footer-divider">|</span>
          <span>© 酆都在线学院 · 内部系统</span>
          <span class="footer-divider">|</span>
          <span>未经授权禁止外传</span>
        </div>
      </footer>
    `;
  },

  renderAccountModal() {
    // 移除旧 modal
    const old = document.getElementById('account-modal');
    if (old) old.remove();

    const state = GameState.getState();
    const modal = document.createElement('div');
    modal.id = 'account-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <h3>🔐 账号切换</h3>
        <p class="modal-info">
          当前账号：<strong>${this._escape(state.currentAccount === 'player' ? (state.playerName || '新生') : state.currentAccount)}</strong>
          （权限等级 Lv${state.level}）
        </p>
        <div class="modal-field">
          <label>输入账号密码（生日，格式 MMDD 或 YYYYMMDD）：</label>
          <input type="text" id="account-password"
                 placeholder="例如：0715 或 19921015"
                 maxlength="10"
                 autocomplete="off">
        </div>
        <p class="modal-hint" id="modal-msg"></p>
        <div class="modal-buttons">
          <button onclick="Layout.doAccountSwitch()" class="btn-primary">切换账号</button>
          <button onclick="Layout.hideAccountModal()" class="btn-secondary">取消</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // ESC 关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) Layout.hideAccountModal();
    });
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        Layout.hideAccountModal();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // 密码输入回车
    const pwInput = document.getElementById('account-password');
    if (pwInput) {
      pwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') Layout.doAccountSwitch();
      });
      setTimeout(() => pwInput.focus(), 100);
    }
  },

  showAccountModal() {
    this.renderAccountModal();
  },

  hideAccountModal() {
    const modal = document.getElementById('account-modal');
    if (modal) modal.remove();
  },

  async doAccountSwitch() {
    const input = document.getElementById('account-password');
    const msg = document.getElementById('modal-msg');
    if (!input) return;

    const password = input.value.trim();
    if (!password) {
      msg.textContent = '请输入密码';
      return;
    }

    // 先检查陈雨桐
    const tongHash = await this._sha256('0715');
    const lxjHash = await this._sha256('19921015');
    const inputHash = await this._sha256(password);

    if (inputHash === tongHash) {
      GameState.switchAccount('chen-yutong', 1);
      msg.className = 'modal-hint success';
      msg.textContent = '✅ 已切换至陈雨桐账号（Lv1）';
      setTimeout(() => {
        this.hideAccountModal();
        window.location.reload();
      }, 800);
    } else if (inputHash === lxjHash) {
      GameState.switchAccount('lu-xiaoji', 2);
      msg.className = 'modal-hint success';
      msg.textContent = '✅ 已切换至陆晓济账号（Lv2）';
      setTimeout(() => {
        this.hideAccountModal();
        window.location.reload();
      }, 800);
    } else {
      msg.className = 'modal-hint error';
      msg.textContent = '❌ 密码错误，请重试';
      input.value = '';
      input.focus();
    }
  },

  doSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    const keyword = input.value.trim();
    if (!keyword) return;

    if (!SearchEngine.isValidKeyword(keyword)) {
      this._showToast('请使用中文、数字或英文关键词（2-24个字符）', 'warning');
      return;
    }

    const result = SearchEngine.search(keyword);
    const state = GameState.getState();

    if (result) {
      const page = result.page;
      // 权限检查
      if (state.level < page.requiredLevel) {
        GameState.logSearch(keyword, 'blocked');
        window.location.href = this._base + 'search.html?q=' + encodeURIComponent(keyword) + '&blocked=1&level=' + page.requiredLevel;
        return;
      }

      // 记录发现
      if (page.hidden) {
        GameState.foundPage(page.id);
      }
      GameState.logSearch(keyword, page.id);
      window.location.href = this._base + page.url;
    } else {
      // 无结果
      GameState.logSearch(keyword, 'none');
      window.location.href = this._base + 'search.html?q=' + encodeURIComponent(keyword);
    }
  },

  async _sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  _showToast(msg, type) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => { toast.className = 'toast'; }, 2500);
  },

  _escape(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
