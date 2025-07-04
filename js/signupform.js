// signupform.js
function renderSignupForm(container, endpoint) {
    // Modal-style wrapper for centering and matching privacy notice
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'form-modal';

    const formBox = document.createElement('div');
    formBox.className = 'form-content';

    const form = document.createElement('form');
    form.id = 'signup-form';
    form.autocomplete = 'off';

    // Username field
    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Username:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.required = true;

    // Password field
    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;

    // Confirm Password field
    const confirmLabel = document.createElement('label');
    confirmLabel.htmlFor = 'confirm-password';
    confirmLabel.textContent = 'Confirm Password:';
    const confirmInput = document.createElement('input');
    confirmInput.type = 'password';
    confirmInput.id = 'confirm-password';
    confirmInput.name = 'confirm-password';
    confirmInput.required = true;

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Sign Up';

    // reCAPTCHA widget
    const recaptchaDiv = document.createElement('div');
    recaptchaDiv.className = 'g-recaptcha';
    recaptchaDiv.setAttribute('data-sitekey', '6LffGXkrAAAAAMyqY7Fp4l4wMRcYfGJvwiSmwGNu');

    // Message area
    const messageDiv = document.createElement('div');
    messageDiv.id = 'signup-message';

    // Append elements
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(confirmLabel);
    form.appendChild(confirmInput);
    form.appendChild(recaptchaDiv);
    form.appendChild(submitBtn);
    form.appendChild(messageDiv);

    // Handle form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        messageDiv.textContent = '';
        const wittyErrors = [
            "Not here bucko!",
            "Nice try, Wrong Site!",
            "That doesn't look right!",
            "Halt! Who goes there?",
            "Access denied, friend-o!"
        ];
        // Highly secure input validation
        const usernameRegex = /^[a-zA-Z0-9_\-]{3,32}$/;
        if (!usernameRegex.test(username)) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (Invalid username)";
            messageDiv.style.color = 'red';
            return;
        }
        if (password.length < 8 || password.length > 64) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (Password must be 8-64 characters)";
            messageDiv.style.color = 'red';
            return;
        }
        if (/\s/.test(password)) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (No spaces in password)";
            messageDiv.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (Passwords do not match)";
            messageDiv.style.color = 'red';
            return;
        }
        submitBtn.disabled = true;
        // Use the global Cloudflare Worker URL if not provided
        const signupEndpoint = endpoint || (window.CLOUDFLARE_SIGNUP_URL ? window.CLOUDFLARE_SIGNUP_URL : '/api/signup');
        try {
            const response = await fetch(signupEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                messageDiv.textContent = result.message || 'Signup successful!';
                messageDiv.style.color = 'green';
                // Optionally redirect or update UI here
            } else {
                messageDiv.textContent = result.error || wittyErrors[Math.floor(Math.random() * wittyErrors.length)];
                messageDiv.style.color = 'red';
            }
        } catch (err) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + ' (Network error)';
            messageDiv.style.color = 'red';
        } finally {
            submitBtn.disabled = false;
        }
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
