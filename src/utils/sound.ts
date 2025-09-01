class SoundManager {
  private audioContext: AudioContext | null = null;
  private lofiAudio: HTMLAudioElement | null = null;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  playNotificationSound() {
    if (!this.audioContext) {
      // Fallback to system beep
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
      return;
    }

    try {
      // Create a simple beep sound using Web Audio API
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Error playing notification sound:', error);
    }
  }

  startLofiMusic() {
    // For now, we'll use a placeholder. In a real app, you'd load an actual lofi track
    try {
      if (!this.lofiAudio) {
        this.lofiAudio = new Audio();
        this.lofiAudio.loop = true;
        this.lofiAudio.volume = 0.3;
        // You would set src to an actual lofi music file
        // this.lofiAudio.src = '/sounds/lofi.mp3';
      }
      this.lofiAudio.play().catch(error => {
        console.warn('Error playing lofi music:', error);
      });
    } catch (error) {
      console.warn('Error starting lofi music:', error);
    }
  }

  stopLofiMusic() {
    if (this.lofiAudio) {
      this.lofiAudio.pause();
      this.lofiAudio.currentTime = 0;
    }
  }

  setLofiVolume(volume: number) {
    if (this.lofiAudio) {
      this.lofiAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

export const soundManager = new SoundManager();