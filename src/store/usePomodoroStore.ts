import { create } from 'zustand';

export type TimerStatus = 'idle' | 'running' | 'paused';
export type SessionType = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  timeLeft: number;
  status: TimerStatus;
  sessionType: SessionType;
  sessionCount: number;
  totalSessions: number;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  soundEnabled: boolean;
  lofiEnabled: boolean;
}

interface PomodoroActions {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  tick: () => void;
  switchToNextSession: () => void;
  toggleSound: () => void;
  toggleLofi: () => void;
  updateSettings: (settings: Partial<Pick<PomodoroState, 'workDuration' | 'shortBreakDuration' | 'longBreakDuration' | 'longBreakInterval'>>) => void;
}

type PomodoroStore = PomodoroState & PomodoroActions;

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes  
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes
const LONG_BREAK_INTERVAL = 4; // Every 4 work sessions

export const usePomodoroStore = create<PomodoroStore>((set, get) => ({
  // Initial state
  timeLeft: WORK_DURATION,
  status: 'idle',
  sessionType: 'work',
  sessionCount: 0,
  totalSessions: 0,
  workDuration: WORK_DURATION,
  shortBreakDuration: SHORT_BREAK_DURATION,
  longBreakDuration: LONG_BREAK_DURATION,
  longBreakInterval: LONG_BREAK_INTERVAL,
  soundEnabled: true,
  lofiEnabled: false,

  // Actions
  startTimer: () => {
    set({ status: 'running' });
  },

  pauseTimer: () => {
    set({ status: 'paused' });
  },

  resetTimer: () => {
    const state = get();
    let duration: number;

    switch (state.sessionType) {
      case 'work':
        duration = state.workDuration;
        break;
      case 'shortBreak':
        duration = state.shortBreakDuration;
        break;
      case 'longBreak':
        duration = state.longBreakDuration;
        break;
    }

    set({
      timeLeft: duration,
      status: 'idle'
    });
  },

  skipSession: () => {
    const state = get();
    state.switchToNextSession();
  },

  tick: () => {
    const state = get();
    if (state.status !== 'running') return;

    if (state.timeLeft <= 1) {
      // Session completed
      state.switchToNextSession();
    } else {
      set({ timeLeft: state.timeLeft - 1 });
    }
  },

  switchToNextSession: () => {
    const state = get();
    let newSessionType: SessionType;
    let newSessionCount = state.sessionCount;
    let newTotalSessions = state.totalSessions;

    if (state.sessionType === 'work') {
      newSessionCount += 1;
      newTotalSessions += 1;

      // Determine break type based on session count
      if (newSessionCount % state.longBreakInterval === 0) {
        newSessionType = 'longBreak';
      } else {
        newSessionType = 'shortBreak';
      }
    } else {
      // After any break, go back to work
      newSessionType = 'work';
    }

    // Set time for new session
    let newTimeLeft: number;
    switch (newSessionType) {
      case 'work':
        newTimeLeft = state.workDuration;
        break;
      case 'shortBreak':
        newTimeLeft = state.shortBreakDuration;
        break;
      case 'longBreak':
        newTimeLeft = state.longBreakDuration;
        break;
    }

    set({
      sessionType: newSessionType,
      sessionCount: newSessionCount,
      totalSessions: newTotalSessions,
      timeLeft: newTimeLeft,
      status: 'idle'
    });
  },

  toggleSound: () => {
    set(state => ({ soundEnabled: !state.soundEnabled }));
  },

  toggleLofi: () => {
    set(state => ({ lofiEnabled: !state.lofiEnabled }));
  },

  updateSettings: (settings) => {
    set(settings);
  }
}));