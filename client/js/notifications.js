/**
 * Notifications.js - Toast Notification System
 * Beautiful toast notifications with multiple types and animations
 */

class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 4000;
        this.init();
    }

    /**
     * Initialize notification container
     */
    init() {
        // Create container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('notification-container');
        }
    }

    /**
     * Show notification
     * @param {Object} options - Notification options
     * @returns {string} Notification ID
     */
    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = this.defaultDuration,
            action = null,
            dismissible = true
        } = options;

        // Create notification element
        const notification = this.createNotification({
            type,
            title,
            message,
            action,
            dismissible
        });

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto dismiss if duration is set
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(notification.id);
            }, duration);
        }

        // Remove oldest if exceeding max
        if (this.notifications.length > this.maxNotifications) {
            this.dismiss(this.notifications[0].id);
        }

        return notification.id;
    }

    /**
     * Create notification element
     * @param {Object} options - Notification options
     * @returns {HTMLElement} Notification element
     */
    createNotification(options) {
        const { type, title, message, action, dismissible } = options;
        const id = 'notification-' + Utils.generateId();

        const notification = document.createElement('div');
        notification.id = id;
        notification.className = `notification notification-${type}`;

        // Icon
        const icon = this.getIcon(type);

        // Content
        let content = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${Utils.sanitizeHtml(title)}</div>` : ''}
                ${message ? `<div class="notification-message">${Utils.sanitizeHtml(message)}</div>` : ''}
            </div>
        `;

        // Action button
        if (action) {
            content += `
                <button class="notification-action" onclick="window.notificationAction_${id}()">
                    ${action.label}
                </button>
            `;
            // Store action callback
            window[`notificationAction_${id}`] = () => {
                action.callback();
                this.dismiss(id);
            };
        }

        // Dismiss button
        if (dismissible) {
            content += `
                <button class="notification-close" onclick="window.Notifications.dismiss('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
        }

        notification.innerHTML = content;
        return notification;
    }

    /**
     * Get icon for notification type
     * @param {string} type - Notification type
     * @returns {string} Icon HTML
     */
    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            loading: '<i class="fas fa-spinner fa-spin"></i>'
        };
        return icons[type] || icons.info;
    }

    /**
     * Dismiss notification
     * @param {string} id - Notification ID
     */
    dismiss(id) {
        const notification = document.getElementById(id);
        if (!notification) return;

        // Remove show class to trigger exit animation
        notification.classList.remove('show');

        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n.id !== id);
            
            // Clean up action callback
            delete window[`notificationAction_${id}`];
        }, 300);
    }

    /**
     * Dismiss all notifications
     */
    dismissAll() {
        this.notifications.forEach(notification => {
            this.dismiss(notification.id);
        });
    }

    /**
     * Show success notification
     * @param {string} message - Message text
     * @param {string} title - Optional title
     * @param {number} duration - Duration in ms
     */
    success(message, title = 'Success', duration = null) {
        return this.show({
            type: 'success',
            title,
            message,
            duration: duration || this.defaultDuration
        });
    }

    /**
     * Show error notification
     * @param {string} message - Message text
     * @param {string} title - Optional title
     * @param {number} duration - Duration in ms
     */
    error(message, title = 'Error', duration = null) {
        return this.show({
            type: 'error',
            title,
            message,
            duration: duration || this.defaultDuration
        });
    }

    /**
     * Show warning notification
     * @param {string} message - Message text
     * @param {string} title - Optional title
     * @param {number} duration - Duration in ms
     */
    warning(message, title = 'Warning', duration = null) {
        return this.show({
            type: 'warning',
            title,
            message,
            duration: duration || this.defaultDuration
        });
    }

    /**
     * Show info notification
     * @param {string} message - Message text
     * @param {string} title - Optional title
     * @param {number} duration - Duration in ms
     */
    info(message, title = 'Info', duration = null) {
        return this.show({
            type: 'info',
            title,
            message,
            duration: duration || this.defaultDuration
        });
    }

    /**
     * Show loading notification (doesn't auto-dismiss)
     * @param {string} message - Message text
     * @param {string} title - Optional title
     * @returns {string} Notification ID (use to dismiss manually)
     */
    loading(message, title = 'Loading') {
        return this.show({
            type: 'loading',
            title,
            message,
            duration: 0,
            dismissible: false
        });
    }

    /**
     * Show notification with action button
     * @param {Object} options - Notification options
     */
    withAction(options) {
        return this.show({
            ...options,
            dismissible: true
        });
    }
}

// CSS Styles for notifications (inject into head)
const notificationStyles = `
<style>
.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
}

.notification {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 320px;
    max-width: 400px;
    padding: 16px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06),
                0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-left: 4px solid;
    pointer-events: auto;
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification.show {
    opacity: 1;
    transform: translateX(0);
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-warning {
    border-left-color: #f59e0b;
}

.notification-info {
    border-left-color: #3b82f6;
}

.notification-loading {
    border-left-color: #8b5cf6;
}

.notification-icon {
    font-size: 20px;
    flex-shrink: 0;
    margin-top: 2px;
}

.notification-success .notification-icon {
    color: #10b981;
}

.notification-error .notification-icon {
    color: #ef4444;
}

.notification-warning .notification-icon {
    color: #f59e0b;
}

.notification-info .notification-icon {
    color: #3b82f6;
}

.notification-loading .notification-icon {
    color: #8b5cf6;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-title {
    font-weight: 600;
    color: var(--text-primary, #1e293b);
    margin-bottom: 4px;
    font-size: 14px;
}

.notification-message {
    color: var(--text-secondary, #64748b);
    font-size: 13px;
    line-height: 1.5;
}

.notification-action {
    padding: 6px 12px;
    background: var(--primary-color, #8b5cf6);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.notification-action:hover {
    background: var(--primary-dark, #7c3aed);
    transform: translateY(-1px);
}

.notification-close {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
    flex-shrink: 0;
}

.notification-close:hover {
    background: #f1f5f9;
    color: #64748b;
}

/* Mobile responsive */
@media (max-width: 640px) {
    .notification-container {
        top: 10px;
        right: 10px;
        left: 10px;
    }
    
    .notification {
        min-width: auto;
        max-width: none;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .notification {
        background: #1e293b;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.2),
                    0 10px 15px -3px rgba(0, 0, 0, 0.3);
    }
    
    .notification-title {
        color: #f1f5f9;
    }
    
    .notification-message {
        color: #cbd5e1;
    }
    
    .notification-close:hover {
        background: #334155;
        color: #94a3b8;
    }
}
</style>
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('div');
    styleElement.innerHTML = notificationStyles;
    document.head.appendChild(styleElement);
}

// Create global instance
const Notifications = new NotificationManager();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.Notifications = Notifications;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
}
