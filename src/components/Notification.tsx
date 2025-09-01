import React, { useEffect, useState } from 'react';
import { SessionType } from '../store/usePomodoroStore';

interface NotificationProps {
  sessionType: SessionType;
  isBreakSession: boolean;
  isVisible: boolean;
  onClose: () => void;
}

const getNotificationContent = (sessionType: SessionType) => {
  switch (sessionType) {
    case 'work':
      return {
        title: '⚡ Break Complete!',
        message: 'Ready to dive back into focused work?',
        subtitle: 'Let\'s make this session count!',
        bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        emoji: '🚀'
      };
    case 'shortBreak':
      return {
        title: '🍅 Work Session Complete!',
        message: 'Great job! Time for a refreshing break.',
        subtitle: 'Step away, stretch, and recharge for 5 minutes.',
        bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        emoji: '☕'
      };
    case 'longBreak':
      return {
        title: '🌟 Time for a Long Break!',
        message: 'You\'ve earned this extended break!',
        subtitle: 'Take 15-30 minutes to fully disconnect and recharge.',
        bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        emoji: '🧘‍♀️'
      };
  }
};

export const Notification: React.FC<NotificationProps> = ({
  sessionType,
  isBreakSession,
  isVisible,
  onClose
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      // Auto-close after 8 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  const content = getNotificationContent(sessionType);

  return (
    <div className={`notification-overlay ${isAnimating ? 'visible' : ''}`}>
      <div 
        className="notification-modal"
        style={{ background: content.bgColor }}
      >
        <button 
          className="close-btn"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
        
        <div className="notification-content">
          <div className="notification-emoji">
            {content.emoji}
          </div>
          
          <h2 className="notification-title">
            {content.title}
          </h2>
          
          <p className="notification-message">
            {content.message}
          </p>
          
          <p className="notification-subtitle">
            {content.subtitle}
          </p>

          <div className="notification-actions">
            <button 
              className="acknowledge-btn"
              onClick={handleClose}
            >
              Got it! ✨
            </button>
          </div>
        </div>

        <div className="notification-decoration">
          {isBreakSession && (
            <div className="floating-elements">
              <span className="float-1">🌸</span>
              <span className="float-2">✨</span>
              <span className="float-3">🦋</span>
              <span className="float-4">🌿</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};