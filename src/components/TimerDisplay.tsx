import React from 'react';
import { formatTime } from '../utils/time';
import { SessionType } from '../store/usePomodoroStore';

interface TimerDisplayProps {
  timeLeft: number;
  sessionType: SessionType;
  sessionCount: number;
  isRunning: boolean;
  progress: number;
}

const getSessionIcon = (sessionType: SessionType): string => {
  switch (sessionType) {
    case 'work':
      return '🍅';
    case 'shortBreak':
      return '☕';
    case 'longBreak':
      return '🌟';
  }
};

const getSessionTitle = (sessionType: SessionType): string => {
  switch (sessionType) {
    case 'work':
      return 'Focus Time';
    case 'shortBreak':
      return 'Short Break';
    case 'longBreak':
      return 'Long Break';
  }
};

const getSessionColor = (sessionType: SessionType): string => {
  switch (sessionType) {
    case 'work':
      return '#ff6b6b';
    case 'shortBreak':
      return '#51cf66';
    case 'longBreak':
      return '#ffd43b';
  }
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  sessionType,
  sessionCount,
  isRunning,
  progress
}) => {
  const sessionColor = getSessionColor(sessionType);
  
  return (
    <div className="timer-display">
      <div className="session-info">
        <span className="session-icon">{getSessionIcon(sessionType)}</span>
        <h2 className="session-title">{getSessionTitle(sessionType)}</h2>
        {sessionType === 'work' && (
          <span className="session-count">Session {sessionCount + 1}</span>
        )}
      </div>

      <div className="timer-circle" style={{ '--session-color': sessionColor } as React.CSSProperties}>
        <svg className="progress-ring" width="300" height="300">
          <circle
            className="progress-ring-background"
            cx="150"
            cy="150"
            r="140"
          />
          <circle
            className="progress-ring-foreground"
            cx="150"
            cy="150"
            r="140"
            style={{
              strokeDasharray: `${2 * Math.PI * 140}`,
              strokeDashoffset: `${2 * Math.PI * 140 * (1 - progress / 100)}`,
              stroke: sessionColor
            }}
          />
        </svg>
        
        <div className="timer-content">
          <div className={`timer-text ${isRunning ? 'running' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="timer-status">
            {isRunning ? '⏰ Running' : sessionType === 'work' ? '🎯 Ready to focus?' : '🧘 Time to relax'}
          </div>
        </div>
      </div>
      
      {sessionType !== 'work' && (
        <div className="break-message">
          <p>
            {sessionType === 'longBreak' 
              ? "🌟 You've earned a long break! Take 15-30 minutes to fully recharge."
              : "☕ Take a moment to breathe, stretch, or grab some water."
            }
          </p>
        </div>
      )}
    </div>
  );
};