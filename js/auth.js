document.addEventListener('DOMContentLoaded', () => {
  // 1. Check if logged in
  if (Store.isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }

  // DOM Elements
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('login-form');
  const formRegister = document.getElementById('register-form');
  const switchToRegister = document.querySelector('.switch-to-register');
  const switchToLogin = document.querySelector('.switch-to-login');
  const passwordToggles = document.querySelectorAll('.password-toggle');

  // 2. Tab Switching Logic
  function switchTab(target) {
    if (target === 'login') {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.classList.add('active-form');
      formRegister.classList.remove('active-form');
    } else {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formRegister.classList.add('active-form');
      formLogin.classList.remove('active-form');
    }
    // Clear errors on switch
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  }

  tabLogin.addEventListener('click', () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));
  switchToRegister.addEventListener('click', (e) => { e.preventDefault(); switchTab('register'); });
  switchToLogin.addEventListener('click', (e) => { e.preventDefault(); switchTab('login'); });

  // Password Visibility Toggle
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      const iconEye = toggle.querySelector('.icon-eye');
      const iconEyeOff = toggle.querySelector('.icon-eye-off');
      
      if (input.type === 'password') {
        input.type = 'text';
        iconEye.classList.add('hidden');
        iconEyeOff.classList.remove('hidden');
      } else {
        input.type = 'password';
        iconEye.classList.remove('hidden');
        iconEyeOff.classList.add('hidden');
      }
    });
  });

  // Validation Helpers
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));
  
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + '-error');
    if (input) input.classList.add('error');
    if (errorDiv) errorDiv.textContent = message;
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + '-error');
    if (input) input.classList.remove('error');
    if (errorDiv) errorDiv.textContent = '';
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  }

  // Simulate loading
  function setButtonLoading(btn, isLoading, text) {
    if (isLoading) {
      btn.classList.add('loading');
    } else {
      btn.classList.remove('loading');
    }
  }

  // 3. Register Form Submit
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(formRegister);
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    let hasError = false;

    if (!name) { showError('register-name', 'Full name is required'); hasError = true; }
    if (!email) { showError('register-email', 'Email is required'); hasError = true; }
    else if (!isValidEmail(email)) { showError('register-email', 'Invalid email format'); hasError = true; }
    
    if (!phone) { showError('register-phone', 'Phone is required'); hasError = true; }
    else if (!isValidPhone(phone)) { showError('register-phone', 'Must be a 10-digit number'); hasError = true; }
    
    if (!password) { showError('register-password', 'Password is required'); hasError = true; }
    else if (password.length < 6) { showError('register-password', 'Min 6 characters required'); hasError = true; }
    
    if (password !== confirm) { showError('register-confirm', 'Passwords do not match'); hasError = true; }

    if (hasError) return;

    const btn = document.getElementById('register-submit');
    setButtonLoading(btn, true);

    setTimeout(() => {
      const res = Store.register(name, email, phone, password);
      setButtonLoading(btn, false);
      
      if (res.success) {
        Store.showToast('Account created successfully!', 'success');
        formRegister.reset();
        switchTab('login');
        // Pre-fill email in login
        document.getElementById('login-email').value = email;
      } else {
        Store.showToast(res.error, 'error');
        if (res.error.includes('Email')) showError('register-email', res.error);
      }
    }, 500);
  });

  // 4. Login Form Submit
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(formLogin);

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    let hasError = false;

    if (!email) { showError('login-email', 'Email is required'); hasError = true; }
    if (!password) { showError('login-password', 'Password is required'); hasError = true; }

    if (hasError) return;

    const btn = document.getElementById('login-submit');
    setButtonLoading(btn, true);

    setTimeout(() => {
      const res = Store.login(email, password);
      setButtonLoading(btn, false);

      if (res.success) {
        Store.showToast('Welcome back!', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 500);
      } else {
        Store.showToast(res.error, 'error');
      }
    }, 500);
  });

  // Real-time validation clearing
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      clearError(input.id);
    });
  });
});
