// loginform.js

function renderLoginForm(container, endpoint = '/api/login') {
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
    form.appendChild(document.createElement('br'));
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitBtn);
    form.appendChild(messageDiv);

    // Handle form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        messageDiv.textContent = '';
        submitBtn.disabled = true;
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
                // Optionally redirect or update UI here
            } else {
                messageDiv.textContent = result.error || 'Login failed.';
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