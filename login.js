// login.js
import { signin } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');

  function showError(el, msg) {
    const p = document.getElementById(el.id + 'Error');
    p.textContent = msg;
    p.style.display = 'block';
    el.classList.add('input-error');
  }

  function hideError(el) {
    const p = document.getElementById(el.id + 'Error');
    p.style.display = 'none';
    el.classList.remove('input-error');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    let valid = true;
    if (!usernameEl.value.trim()) {
      showError(usernameEl, 'Please enter your username/email/phone');
      valid = false;
    } else hideError(usernameEl);

    if (!passwordEl.value.trim()) {
      showError(passwordEl, 'Please enter your password');
      valid = false;
    } else hideError(passwordEl);

    if (!valid) return;

    await signin({
      username: usernameEl.value.trim(),
      password: passwordEl.value.trim()
    });
  });
});
