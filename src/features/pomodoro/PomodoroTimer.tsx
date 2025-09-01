import React, { useState, useEffect } from 'react';
import { TimerDisplay } from '../../components/TimerDisplay';
import { Controls } from '../../components/Controls';
import { Notification } from '../../components/Notification';
import { usePomodoro } from './hooks/usePomodoro';
import { getTimeProgress } from '../../utils/time';
import { usePomodoroStore } from '../../store/usePomodoroStore';

export const PomodoroTimer: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [prevSessionType, setPrevSessionType] = useState('');
  
  const pomodoro = usePomodoro();
  const { workDuration, shortBreakDuration, longBreakDuration } = usePomodoroStore();

  // Calculate progress based on session type
  const getTotalTime = () => {
    switch (pomodoro.sessionType) {
      case 'work':
        return workDuration;
      case 'shortBreak':
        return shortBreakDuration;
      case 'longBreak':
        return longBreakDuration;
    }
  };

  const progress = getTimeProgress(pomodoro.timeLeft, getTotalTime());

  // Show notification on session change
  useEffect(() => {
    if (prevSessionType && prevSessionType !== pomodoro.sessionType) {
      setShowNotification(true);
    }
    setPrevSessionType(pomodoro.sessionType);
  }, [pomodoro.sessionType, prevSessionType]);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-container">
        <TimerDisplay
          timeLeft={pomodoro.timeLeft}
          sessionType={pomodoro.sessionType}
          sessionCount={pomodoro.sessionCount}
          isRunning={pomodoro.isRunning}
          progress={progress}
        />

        <Controls
          status={pomodoro.status}
          sessionType={pomodoro.sessionType}
          soundEnabled={pomodoro.soundEnabled}
          lofiEnabled={pomodoro.lofiEnabled}
          onStart={pomodoro.startTimer}
          onPause={pomodoro.pauseTimer}
          onReset={pomodoro.resetTimer}
          onSkip={pomodoro.skipSession}
          onToggleSound={pomodoro.toggleSound}
          onToggleLofi={pomodoro.toggleLofi}
        />
      </div>

      <Notification
        sessionType={pomodoro.sessionType}
        isBreakSession={pomodoro.isBreakSession}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </div>
  );
};