// api.js

// دالة الـ signup زي ما كانت
export async function signup(formData) {
    try {
      const res = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Unknown error');
      }
      window.location.href = '/dashboard';
    } catch (e) {
      alert('Signup failed: ' + e.message);
    }
  }
  
  // دالة الـ signin المحدثة
  export async function signin({ username, password }) {
    try {
      // نجرب أولاً match بالإيميل
      let res = await fetch(`http://localhost:3000/auth?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&_limit=1`);
      let users = await res.json();
  
      // لو ملقيناش بالإيميل، نجرب بالموبايل
      if (users.length === 0) {
        res = await fetch(`http://localhost:3000/auth?phone=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&_limit=1`);
        users = await res.json();
      }
  
      if (users.length === 0) {
        throw new Error('Invalid username or password');
      }
  
      // لو لاقين match واحد على الأقل
      window.location.href = '/dashboard';
    } catch (e) {
      alert('Login failed: ' + e.message);
    }
  }
  


  // api.js
export async function forgetPassword(formData) {
  try {
      const response = await fetch('http://localhost:3000/auth/forget-password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
      });

      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Unknown error');
      }
      // لو نجح
      alert("A reset code has been sent to your email or phone.");
      // ممكن تحول المستخدم لصفحة ثانية زي الصفحة الخاصة بإدخال الكود
      window.location.href = '/code.html';
  } catch (e) {
      document.getElementById('errorMessage').textContent = 'Error: ' + e.message;
  }
}
