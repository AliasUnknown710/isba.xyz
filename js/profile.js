// This script handles the user profile page functionality
// It fetches user data, allows password changes, and account deletion.

async function apiRequest(path, method, data, customBase) {
    // The backend URL is set as a secret environment variable in the Cloudflare Worker
    // The worker will proxy requests to the Python backend securely
    const apiBase = customBase || window.CLOUDFLARE_API_BASE_URL; // Provided by <script> tag in HTML
    const resp = await fetch(apiBase + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: data ? JSON.stringify(data) : undefined
    });
    if (!resp.ok) throw new Error(await resp.text());
    return await resp.json();
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch user info from backend
        const user = await apiRequest('/user/profile', 'GET');
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-email').textContent = user.email;
    } catch (err) {
        document.getElementById('profile-username').textContent = 'Error';
        document.getElementById('profile-email').textContent = 'Error';
    }

    // Change password form
    document.getElementById('change-password-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const current = document.getElementById('current-password').value;
        const next = document.getElementById('new-password').value;
        const msg = document.getElementById('change-password-message');
        msg.textContent = '';
        if (!current || !next) {
            msg.textContent = 'Please fill out all fields.';
            msg.style.color = '#FFD600';
            return;
        }
        try {
            await apiRequest('/user/change-password', 'POST', { current_password: current, new_password: next });
            msg.textContent = 'Password changed successfully!';
            msg.style.color = '#39FF14';
            this.reset();
        } catch (err) {
            msg.textContent = err.message || 'Error changing password.';
            msg.style.color = '#ff1744';
        }
    });

    // Delete account form
    document.getElementById('delete-account-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const delpw = document.getElementById('delete-password').value;
        const msg = document.getElementById('delete-account-message');
        msg.textContent = '';
        if (!delpw) {
            msg.textContent = 'Please enter your password.';
            msg.style.color = '#FFD600';
            return;
        }
        if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
        try {
            // Use the dedicated Cloudflare Worker for delete profile if available
            const deleteBase = window.CLOUDFLARE_DELETE_PROFILE_URL || window.CLOUDFLARE_API_BASE_URL;
            await apiRequest('/user/delete', 'POST', { password: delpw }, deleteBase);
            msg.textContent = 'Account deleted. Logging out...';
            msg.style.color = '#ff1744';
            setTimeout(() => {
                localStorage.clear();
                window.location.href = 'index.html';
            }, 2000);
        } catch (err) {
            msg.textContent = err.message || 'Error deleting account.';
            msg.style.color = '#FFD600';
        }
    });
});
