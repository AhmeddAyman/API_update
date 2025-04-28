// signup.js
import { signup } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');

  // 1) setupPasswordToggle (كما في كودك الأصلي)
  function setupPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // eye SVGs...
    const eyeOpenSVG = `...`;
    const eyeClosedSVG = `...`;

    [passwordInput, confirmPasswordInput].forEach(input => {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.innerHTML = eyeClosedSVG;
      toggleBtn.className = 'password-toggle';
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(toggleBtn);

      toggleBtn.addEventListener('click', () => {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggleBtn.innerHTML = type === 'password' ? eyeClosedSVG : eyeOpenSVG;
      });
    });
  }

  // 2) Validation helpers (showError, hideError, validateField) زي ما كان عندك

  const patterns = {
    phone: /^\d{11}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  };

  function showError(input, message) {
    const err = document.getElementById(input.id + 'Error');
    err.textContent = message;
    err.style.display = 'block';
    input.classList.add('input-error');
  }

  function hideError(input) {
    const err = document.getElementById(input.id + 'Error');
    err.style.display = 'none';
    input.classList.remove('input-error');
  }

  function validateField(input) {
    let valid = true;
    if (input.required && !input.value.trim()) {
      showError(input, `Please enter your ${input.placeholder.toLowerCase()}`);
      valid = false;
    } else {
      switch (input.id) {
        case 'phone':
          if (!patterns.phone.test(input.value)) {
            showError(input, 'Please enter a valid 11-digit phone number');
            valid = false;
          }
          break;
        case 'email':
          if (!patterns.email.test(input.value)) {
            showError(input, 'Please enter a valid email address');
            valid = false;
          }
          break;
        case 'password':
          if (!patterns.password.test(input.value)) {
            showError(input, 'Password must be 8+ chars, 1 uppercase, 1 number & 1 special');
            valid = false;
          }
          break;
        case 'confirmPassword':
          if (input.value !== document.getElementById('password').value) {
            showError(input, 'Passwords do not match');
            valid = false;
          }
          break;
      }
    }
    if (valid) hideError(input);
    return valid;
  }

  // attach real-time validation
  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => validateField(input));
  });

  // init eye-toggle
  setupPasswordToggle();

  // 3) on submit: اجمع البيانات ونادي signup()
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    let isValid = true;
    form.querySelectorAll('input, select').forEach(i => {
      if (!validateField(i)) isValid = false;
    });

    if (!isValid) {
      alert('من فضلك صحح الأخطاء فوق 😅');
      return;
    }

    // data ready
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName:  document.getElementById('lastName').value,
      phone:     document.getElementById('phone').value,
      email:     document.getElementById('email').value,
      state:     document.getElementById('state').value,
      city:      document.getElementById('city').value,
      street:    document.getElementById('street').value,
      gender:    document.getElementById('gender').value,
      password:  document.getElementById('password').value,
    };

    
    await signup(formData);
  });
});  
