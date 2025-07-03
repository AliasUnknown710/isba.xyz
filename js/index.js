// js/index.js
// Handles login/signup form rendering and privacy modal for the landing page

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const privacyBtn = document.getElementById('privacy-btn');
    const privacyModal = document.getElementById('privacy-modal');
    const closePrivacy = document.getElementById('close-privacy');
    const formContainer = document.getElementById('form-container');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (typeof renderLoginForm === 'function') {
                formContainer.innerHTML = '';
                renderLoginForm(formContainer, '/api/login');
            }
        });
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            if (typeof renderSignupForm === 'function') {
                formContainer.innerHTML = '';
                renderSignupForm(formContainer, '/api/signup');
            }
        });
    }
    if (privacyBtn && privacyModal && closePrivacy) {
        privacyBtn.addEventListener('click', function() {
            privacyModal.style.display = 'flex';
        });
        closePrivacy.addEventListener('click', function() {
            privacyModal.style.display = 'none';
        });
    }
});
