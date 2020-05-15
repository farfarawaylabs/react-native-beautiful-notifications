import React from 'react';

function generateNotificationId() {
  return `${Date.now()}`;
}

/**
 * Holds the actual notifications that should be displayed on the screen
 */
class NotificationsDataSource {
  notifications: any[] = [];

  addNotification(notification: any) {
    const newNotificationId = generateNotificationId();

    const clonedNotification = React.cloneElement(notification, {
      key: newNotificationId,
      onDisappear: () => {
        this.removeNotification(newNotificationId);
      },
    });

    this.notifications.push(clonedNotification);
  }

  removeNotification(notificationKey: string) {
    const filteredNotifications = this.notifications.filter(
      (currNotification) => currNotification.key !== notificationKey
    );

    this.notifications = filteredNotifications;
  }
}

export default new NotificationsDataSource();
