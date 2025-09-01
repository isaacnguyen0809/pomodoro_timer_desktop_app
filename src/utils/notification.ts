export class NotificationManager {
  private permission: NotificationPermission = 'default';

  constructor() {
    this.requestPermission();
  }

  async requestPermission(): Promise<void> {
    if ('Notification' in window) {
      try {
        this.permission = await Notification.requestPermission();
      } catch (error) {
        console.warn('Error requesting notification permission:', error);
      }
    }
  }

  showNotification(title: string, body: string, options?: NotificationOptions): void {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    if (this.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body,
          icon: '/favicon.ico',
          tag: 'pomodoro-timer',
          requireInteraction: true,
          ...options
        });

        // Auto-close notification after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);
      } catch (error) {
        console.warn('Error showing notification:', error);
      }
    }
  }

  showWorkSessionComplete(): void {
    this.showNotification(
      '🍅 Work Session Complete!',
      'Great job! Time for a well-deserved break. Step away from your screen and relax.'
    );
  }

  showBreakComplete(): void {
    this.showNotification(
      '⚡ Break Time Over!',
      'Feeling refreshed? Let\'s get back to productive work!'
    );
  }

  showLongBreakStart(): void {
    this.showNotification(
      '🌟 Long Break Time!',
      'You\'ve earned a longer break. Take 15-30 minutes to recharge completely.'
    );
  }
}

export const notificationManager = new NotificationManager();