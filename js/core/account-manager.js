const AccountManager = {
  async login(username, password) {
    const id = SearchEngine.normalize(username);
    const account = Object.values(StoryData.accounts).find(acc =>
      SearchEngine.normalize(acc.username || acc.id) === id ||
      SearchEngine.normalize(acc.displayName) === id
    );

    if (!account) {
      return { ok: false, reason: '账号不存在，或该账号不允许从当前入口登录。' };
    }

    const hash = await this.sha256(String(password || '').trim());
    if (hash !== account.passwordHash) {
      return { ok: false, reason: '账号或密码不匹配。' };
    }

    GameState.switchAccount(account.id, account.level);
    return { ok: true, account };
  },

  async sha256(message) {
    const data = new TextEncoder().encode(message);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  getCurrentLabel() {
    const state = GameState.getState();
    if (state.currentAccount === 'player') return state.playerName || '新生账号';
    const account = StoryData.getAccount(state.currentAccount);
    return account ? account.displayName : state.currentAccount;
  }
};
