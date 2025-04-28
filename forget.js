// index.js
import { forgetPassword } from './api.js';

document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // منع إرسال الفورم بالطريقة التقليدية

    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) {
        document.getElementById('errorMessage').textContent = "Please enter a valid email or phone number.";
        return;
    }

    const formData = { email: userInput }; // لو فيه رقم تليفون هتضيفه هنا برضه

    // بعتنا الفورم للـ API
    forgetPassword(formData);
});
