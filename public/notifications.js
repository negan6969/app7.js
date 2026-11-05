// Shared Toast Notification Helper for Student Management System
(function () {
    // Check if container exists, create if not
    function getToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }
        return container;
    }

    // Public method to show toast
    window.showToast = function (message, type = 'success', duration = 3500) {
        const container = getToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconSvg = type === 'success' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

        toast.innerHTML = `
            <div class="toast-icon">${iconSvg}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" aria-label="Close notification" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('toast-hiding');
                setTimeout(() => toast.remove(), 250);
            }
        }, duration);
    };

    // Check if there is a pending flash toast stored from a previous page redirect
    window.addEventListener('DOMContentLoaded', () => {
        try {
            const flash = sessionStorage.getItem('sms_toast_flash');
            if (flash) {
                const data = JSON.parse(flash);
                sessionStorage.removeItem('sms_toast_flash');
                window.showToast(data.message, data.type || 'success');
            }
        } catch (e) {
            console.error('Toast flash error:', e);
        }
    });

    // Helper to trigger toast and redirect cleanly
    window.redirectWithToast = function (url, message, type = 'success') {
        try {
            sessionStorage.setItem('sms_toast_flash', JSON.stringify({ message, type }));
        } catch (e) {}
        window.location.href = url;
    };
})();
