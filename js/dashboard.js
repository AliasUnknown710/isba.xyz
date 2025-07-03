// js/dashboard.js
// Handles session token refresh and dashboard logic

document.addEventListener('DOMContentLoaded', function() {
    // Example: Refresh session token after login (should be replaced with real API call)
    async function refreshSessionToken() {
        try {
            const response = await fetch('/api/refresh-token', { method: 'POST', credentials: 'include' });
            if (response.ok) {
                // Optionally update local/session storage or cookies here
                console.log('Session token refreshed');
            } else {
                console.warn('Session token refresh failed');
            }
        } catch (e) {
            console.error('Network error during token refresh');
        }
    }
    // Call on page load
    refreshSessionToken();
});
