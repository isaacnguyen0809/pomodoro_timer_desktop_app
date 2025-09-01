import { useEffect, useRef } from 'react';
import { usePomodoroStore } from '../../../store/usePomodoroStore';
import { soundManager } from '../../../utils/sound';
import { notificationManager } from '../../../utils/notification';

export function usePomodoro() {
  const intervalRef = useRef<number | null>(null);
  const prevSessionTypeRef = useRef<string>('');
  
  const {
    timeLeft,
    status,
    sessionType,
    sessionCount,
    soundEnabled,
    lofiEnabled,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    tick,
    switchToNextSession,
    toggleSound,
    toggleLofi
  } = usePomodoroStore();

  // Main timer interval
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, tick]);

  // Handle session changes and notifications
  useEffect(() => {
    if (prevSessionTypeRef.current && prevSessionTypeRef.current !== sessionType) {
      // Session has changed
      if (soundEnabled) {
        soundManager.playNotificationSound();
      }

      // Show appropriate notification
      if (sessionType === 'work') {
        notificationManager.showBreakComplete();
        if (lofiEnabled) {
          soundManager.stopLofiMusic();
        }
      } else if (sessionType === 'shortBreak') {
        notificationManager.showWorkSessionComplete();
        if (lofiEnabled) {
          soundManager.startLofiMusic();
        }
      } else if (sessionType === 'longBreak') {
        notificationManager.showLongBreakStart();
        if (lofiEnabled) {
          soundManager.startLofiMusic();
        }
      }
    }
    
    prevSessionTypeRef.current = sessionType;
  }, [sessionType, soundEnabled, lofiEnabled]);

  // Handle lofi music for break sessions
  useEffect(() => {
    if (sessionType !== 'work' && lofiEnabled) {
      soundManager.startLofiMusic();
    } else {
      soundManager.stopLofiMusic();
    }
  }, [lofiEnabled, sessionType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundManager.stopLofiMusic();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    startTimer();
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleReset = () => {
    resetTimer();
  };

  const handleSkip = () => {
    skipSession();
  };

  const handleToggleSound = () => {
    toggleSound();
  };

  const handleToggleLofi = () => {
    toggleLofi();
  };

  return {
    // State
    timeLeft,
    status,
    sessionType,
    sessionCount,
    soundEnabled,
    lofiEnabled,
    
    // Actions
    startTimer: handleStart,
    pauseTimer: handlePause,
    resetTimer: handleReset,
    skipSession: handleSkip,
    toggleSound: handleToggleSound,
    toggleLofi: handleToggleLofi,
    
    // Computed
    isRunning: status === 'running',
    isPaused: status === 'paused',
    isIdle: status === 'idle',
    isWorkSession: sessionType === 'work',
    isBreakSession: sessionType !== 'work',
    isLongBreak: sessionType === 'longBreak'
  };
}