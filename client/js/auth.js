/**
 * Voxly Pro — Auth module
 * Handles session check, login, signup, logout. Gates the main app.
 */

window.Auth = (() => {
  const API = '/api/auth';
  let currentUser = null;

  const el = (id) => document.getElementById(id);
  const show = (node) => node && (node.style.display = '');
  const hide = (node) => node && (node.style.display = 'none');

  const request = async (path, options = {}) => {
    const res = await fetch(API + path, {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || `Request failed (${res.status})`);
      err.status = res.status;
      err.details = data.details;
      throw err;
    }
    return data;
  };

  const setFormError = (formId, msg) => {
    const box = el(formId + 'Error');
    if (!box) return;
    if (msg) {
      box.textContent = msg;
      box.style.display = '';
    } else {
      box.textContent = '';
      box.style.display = 'none';
    }
  };

  const setSubmitting = (formId, isSubmitting) => {
    const btn = el(formId + 'Submit');
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.dataset.defaultText = btn.dataset.defaultText || btn.textContent;
    btn.textContent = isSubmitting ? 'Please wait…' : btn.dataset.defaultText;
  };

  const showAuthScreen = (mode = 'login') => {
    const screen = el('authScreen');
    const app = el('appContainer');
    const loading = el('loadingScreen');
    hide(loading);
    hide(app);
    show(screen);
    switchPanel(mode);
  };

  const hideAuthScreen = () => {
    hide(el('authScreen'));
    show(el('appContainer'));
  };

  const switchPanel = (mode) => {
    const login = el('loginPanel');
    const signup = el('signupPanel');
    if (mode === 'signup') {
      hide(login);
      show(signup);
    } else {
      show(login);
      hide(signup);
    }
    setFormError('login', '');
    setFormError('signup', '');
  };

  const updateUserInSidebar = (user) => {
    if (!user) return;
    // Local display-name override (set via Settings > General > Display Name)
    const override = localStorage.getItem('voxly_display_name');
    const displayName = override || user.name || user.email.split('@')[0];

    // Sync back to the live user cache so other consumers see the override too.
    if (override) user.name = override;

    const avatar = document.querySelector('.sidebar-footer .user-avatar');
    const headerAvatar = document.querySelector('.user-avatar-small');
    const name = document.querySelector('.sidebar-footer .user-name');
    const role = document.querySelector('.sidebar-footer .user-role');
    const initials = displayName
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    if (avatar) avatar.textContent = initials;
    if (headerAvatar) headerAvatar.textContent = initials;
    if (name) name.textContent = displayName;
    if (role) role.textContent = user.role === 'admin' ? 'Administrator' : 'Member';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('login', '');
    setSubmitting('login', true);
    const form = e.target;
    try {
      const { user } = await request('/login', {
        method: 'POST',
        body: {
          email: form.email.value.trim(),
          password: form.password.value,
        },
      });
      currentUser = user;
      updateUserInSidebar(user);
      hideAuthScreen();
      bootMainApp();
    } catch (err) {
      setFormError('login', err.message);
    } finally {
      setSubmitting('login', false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError('signup', '');
    setSubmitting('signup', true);
    const form = e.target;
    try {
      const { user } = await request('/signup', {
        method: 'POST',
        body: {
          email: form.email.value.trim(),
          password: form.password.value,
          name: form.name.value.trim() || undefined,
        },
      });
      currentUser = user;
      updateUserInSidebar(user);
      hideAuthScreen();
      bootMainApp();
    } catch (err) {
      const firstDetail =
        err.details && Object.values(err.details).flat()[0];
      setFormError('signup', firstDetail || err.message);
    } finally {
      setSubmitting('signup', false);
    }
  };

  const logout = async () => {
    try {
      await request('/logout', { method: 'POST' });
    } catch {
      /* ignore — we still reset local state */
    }
    currentUser = null;
    window.location.reload();
  };

  const bootMainApp = () => {
    if (window.voxlyApp) return; // already running
    if (typeof VoxlyApp !== 'undefined') {
      window.voxlyApp = new VoxlyApp();
    }
  };

  const attachFormHandlers = () => {
    const loginForm = el('loginForm');
    const signupForm = el('signupForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    document.querySelectorAll('[data-auth-switch]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchPanel(link.dataset.authSwitch);
      });
    });
  };

  const init = async () => {
    attachFormHandlers();
    try {
      const { user } = await request('/me');
      currentUser = user;
      updateUserInSidebar(user);
      hideAuthScreen();
      bootMainApp();
    } catch {
      showAuthScreen('login');
    }
  };

  return {
    init,
    logout,
    getUser: () => currentUser,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  window.Auth.init();
});
