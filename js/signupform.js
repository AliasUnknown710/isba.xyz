// signupform.js
function renderSignupForm(container, endpoint = '/api/signup') {
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
    form.id = 'signup-form';
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

    // Confirm Password field
    const confirmLabel = document.createElement('label');
    confirmLabel.htmlFor = 'confirm-password';
    confirmLabel.textContent = 'Confirm Password:';
    confirmLabel.style.display = 'block';
    confirmLabel.style.marginTop = '1rem';
    const confirmInput = document.createElement('input');
    confirmInput.type = 'password';
    confirmInput.id = 'confirm-password';
    confirmInput.name = 'confirm-password';
    confirmInput.required = true;
    confirmInput.style.width = '100%';
    confirmInput.style.marginBottom = '1rem';
    confirmInput.style.background = '#111';
    confirmInput.style.color = '#39FF14';
    confirmInput.style.border = '1px solid #39FF14';
    confirmInput.style.borderRadius = '6px';
    confirmInput.style.padding = '0.5rem';

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Sign Up';
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
    messageDiv.id = 'signup-message';
    messageDiv.style.marginTop = '1rem';

    // Append elements
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(confirmLabel);
    form.appendChild(confirmInput);
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
        try {
            const response = await fetch(endpoint, {
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

    formBox.appendChild(form);
    modalWrapper.appendChild(formBox);
    container.innerHTML = '';
    container.appendChild(modalWrapper);
}
