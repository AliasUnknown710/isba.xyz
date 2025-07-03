// loginform.js

function renderLoginForm(container, endpoint = '/api/login') {
    // Modal-style wrapper for centering and matching privacy notice
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'privacy-modal';
    modalWrapper.style.display = 'flex';
    modalWrapper.style.position = 'fixed';
    modalWrapper.style.top = '0';
    modalWrapper.style.left = '0';
    modalWrapper.style.width = '100vw';
    modalWrapper.style.height = '100vh';
    modalWrapper.style.background = 'rgba(0,0,0,0.85)';
    modalWrapper.style.zIndex = '1000';
    modalWrapper.style.alignItems = 'center';
    modalWrapper.style.justifyContent = 'center';

    const formBox = document.createElement('div');
    formBox.className = 'privacy-content';

    const form = document.createElement('form');
    form.id = 'login-form';
    form.autocomplete = 'off';

    // Username field
    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Username:';
    usernameLabel.style.display = 'block';
    usernameLabel.style.marginTop = '1rem';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.required = true;
    usernameInput.style.width = '100%';
    usernameInput.style.marginBottom = '1rem';
    usernameInput.style.background = '#111';
    usernameInput.style.color = '#39FF14';
    usernameInput.style.border = '1px solid #39FF14';
    usernameInput.style.borderRadius = '6px';
    usernameInput.style.padding = '0.5rem';

    // Password field
    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Password:';
    passwordLabel.style.display = 'block';
    passwordLabel.style.marginTop = '1rem';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.style.width = '100%';
    passwordInput.style.marginBottom = '1rem';
    passwordInput.style.background = '#111';
    passwordInput.style.color = '#39FF14';
    passwordInput.style.border = '1px solid #39FF14';
    passwordInput.style.borderRadius = '6px';
    passwordInput.style.padding = '0.5rem';

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Login';
    submitBtn.style.background = '#FFD600';
    submitBtn.style.color = '#000';
    submitBtn.style.border = 'none';
    submitBtn.style.borderRadius = '6px';
    submitBtn.style.padding = '0.5rem 1.5rem';
    submitBtn.style.fontSize = '1rem';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.marginTop = '1rem';

    // Message area
    const messageDiv = document.createElement('div');
    messageDiv.id = 'login-message';
    messageDiv.style.marginTop = '1rem';

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

    formBox.appendChild(form);
    modalWrapper.appendChild(formBox);
    container.innerHTML = '';
    container.appendChild(modalWrapper);
}