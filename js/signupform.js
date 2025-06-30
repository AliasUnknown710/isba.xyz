// signupform.js
function renderSignupForm(container, endpoint = '/api/signup') {
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

    // Message area
    const messageDiv = document.createElement('div');
    messageDiv.id = 'signup-message';

    // Append elements
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(confirmLabel);
    form.appendChild(confirmInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitBtn);
    form.appendChild(messageDiv);

    // Handle form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        messageDiv.textContent = '';
        if (password !== confirmPassword) {
            messageDiv.textContent = 'Passwords do not match.';
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
                messageDiv.textContent = result.error || 'Signup failed.';
                messageDiv.style.color = 'red';
            }
        } catch (err) {
            messageDiv.textContent = 'Network error.';
            messageDiv.style.color = 'red';
        } finally {
            submitBtn.disabled = false;
        }
    });

    container.appendChild(form);
}
