export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatMinutes(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return `${mins}m`;
}

export function getTimeProgress(timeLeft: number, totalTime: number): number {
  return ((totalTime - timeLeft) / totalTime) * 100;
}