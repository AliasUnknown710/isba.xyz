        // Utility function to sanitize URLs before navigation or assignment
        function sanitizeUrl(url) {
            try {
                const parsed = new URL(url, window.location.origin);
                // Only allow same-origin or specific trusted domains
                if (parsed.origin === window.location.origin) {
                    return parsed.href;
                }
            } catch (e) {
                // Invalid URL
            }
            return '/';
        }
        // Example usage:
        // window.location.href = sanitizeUrl(userInputUrl);