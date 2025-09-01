import React from 'react';
import { TimerStatus, SessionType } from '../store/usePomodoroStore';

interface ControlsProps {
  status: TimerStatus;
  sessionType: SessionType;
  soundEnabled: boolean;
  lofiEnabled: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onToggleSound: () => void;
  onToggleLofi: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  status,
  sessionType,
  soundEnabled,
  lofiEnabled,
  onStart,
  onPause,
  onReset,
  onSkip,
  onToggleSound,
  onToggleLofi
}) => {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle';

  return (
    <div className="controls">
      <div className="main-controls">
        {isIdle && (
          <button 
            className="control-btn start-btn"
            onClick={onStart}
            title="Start Timer"
          >
            <span className="btn-icon">▶️</span>
            <span className="btn-text">Start</span>
          </button>
        )}
        
        {isRunning && (
          <button 
            className="control-btn pause-btn"
            onClick={onPause}
            title="Pause Timer"
          >
            <span className="btn-icon">⏸️</span>
            <span className="btn-text">Pause</span>
          </button>
        )}
        
        {isPaused && (
          <button 
            className="control-btn resume-btn"
            onClick={onStart}
            title="Resume Timer"
          >
            <span className="btn-icon">▶️</span>
            <span className="btn-text">Resume</span>
          </button>
        )}

        <button 
          className="control-btn reset-btn"
          onClick={onReset}
          title="Reset Timer"
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">Reset</span>
        </button>

        <button 
          className="control-btn skip-btn"
          onClick={onSkip}
          title="Skip Session"
        >
          <span className="btn-icon">⏭️</span>
          <span className="btn-text">Skip</span>
        </button>
      </div>

      <div className="settings-controls">
        <button 
          className={`control-btn toggle-btn ${soundEnabled ? 'active' : ''}`}
          onClick={onToggleSound}
          title={soundEnabled ? "Disable Sound" : "Enable Sound"}
        >
          <span className="btn-icon">{soundEnabled ? '🔊' : '🔇'}</span>
          <span className="btn-text">Sound</span>
        </button>

        {sessionType !== 'work' && (
          <button 
            className={`control-btn toggle-btn ${lofiEnabled ? 'active' : ''}`}
            onClick={onToggleLofi}
            title={lofiEnabled ? "Stop Lofi Music" : "Play Lofi Music"}
          >
            <span className="btn-icon">{lofiEnabled ? '🎵' : '🎶'}</span>
            <span className="btn-text">Lofi</span>
          </button>
        )}
      </div>

      <div className="status-indicator">
        <div className={`status-dot ${status}`}></div>
        <span className="status-text">
          {isRunning && "Timer is running"}
          {isPaused && "Timer is paused"}
          {isIdle && "Timer is ready"}
        </span>
      </div>
    </div>
  );
};