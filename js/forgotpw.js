// forgotpw.js
// Handles the Forgotten Password link and modal (placeholder for now)

export function renderForgotPasswordModal(container) {
    // Modal-style wrapper
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'form-modal';

    const formBox = document.createElement('div');
    formBox.className = 'form-content';

    const form = document.createElement('form');
    form.id = 'forgotpw-form';
    form.autocomplete = 'off';

    const title = document.createElement('h2');
    title.textContent = 'Forgot Password?';
    title.style.color = '#39FF14';
    form.appendChild(title);

    const info = document.createElement('p');
    info.textContent = 'Enter your email or username and we\'ll send you instructions to reset your password.';
    info.style.color = '#fff';
    form.appendChild(info);

    const userLabel = document.createElement('label');
    userLabel.htmlFor = 'forgotpw-user';
    userLabel.textContent = 'Email or Username:';
    form.appendChild(userLabel);

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'forgotpw-user';
    userInput.name = 'forgotpw-user';
    userInput.required = true;
    form.appendChild(userInput);

    // reCAPTCHA widget
    const recaptchaDiv = document.createElement('div');
    recaptchaDiv.className = 'g-recaptcha';
    recaptchaDiv.setAttribute('data-sitekey', '6LffGXkrAAAAAMyqY7Fp4l4wMRcYfGJvwiSmwGNu');

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Send Reset Link';
    form.appendChild(recaptchaDiv);
    form.appendChild(submitBtn);

    const messageDiv = document.createElement('div');
    messageDiv.id = 'forgotpw-message';
    form.appendChild(messageDiv);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        messageDiv.textContent = 'Password reset coming soon!';
        messageDiv.style.color = '#FFD600';
    });

    // Add close on background click
    modalWrapper.addEventListener('click', function(e) {
        if (e.target === modalWrapper) {
            container.innerHTML = '';
        }
    });

    formBox.appendChild(form);
    modalWrapper.appendChild(formBox);
    container.innerHTML = '';
    container.appendChild(modalWrapper);
}

// For non-module usage (if needed)
window.renderForgotPasswordModal = renderForgotPasswordModal;
