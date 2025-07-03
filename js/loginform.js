// loginform.js

function renderLoginForm(container, endpoint = '/api/login') {
    // Modal-style wrapper for centering and matching privacy notice
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'form-modal';

    const formBox = document.createElement('div');
    formBox.className = 'form-content';

    const form = document.createElement('form');
    form.id = 'login-form';
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

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Login';

    // Message area
    const messageDiv = document.createElement('div');
    messageDiv.id = 'login-message';

    // Append elements
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);
    form.appendChild(messageDiv);

    // Handle form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        messageDiv.textContent = '';
        submitBtn.disabled = true;
        // Highly secure input validation
        const wittyErrors = [
            "Not here bucko!",
            "Nice try, Wrong Site!",
            "That doesn't look right!",
            "Halt! Who goes there?",
            "Access denied, friend-o!"
        ];
        const usernameRegex = /^[a-zA-Z0-9_\-]{3,32}$/;
        if (!usernameRegex.test(username)) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (Invalid username)";
            messageDiv.style.color = 'red';
            submitBtn.disabled = false;
            return;
        }
        if (password.length < 8 || password.length > 64) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (Password must be 8-64 characters)";
            messageDiv.style.color = 'red';
            submitBtn.disabled = false;
            return;
        }
        if (/\s/.test(password)) {
            messageDiv.textContent = wittyErrors[Math.floor(Math.random() * wittyErrors.length)] + " (No spaces in password)";
            messageDiv.style.color = 'red';
            submitBtn.disabled = false;
            return;
        }
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (response.ok) {
                messageDiv.textContent = result.message || 'Login successful!';
                messageDiv.style.color = 'green';
                // Refresh session token for security, then redirect
                try {
                    await fetch('/api/refresh-token', { method: 'POST', credentials: 'include' });
                } catch (e) {
                    // Optionally handle token refresh error
                }
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
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