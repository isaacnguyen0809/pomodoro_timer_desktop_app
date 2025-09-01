import { PomodoroTimer } from "./features/pomodoro/PomodoroTimer";
import "./App.css";

function App(): React.JSX.Element {
  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-icon">🍅</span>
          <span className="app-name">Focus Timer</span>
        </h1>
        <p className="app-subtitle">Stay focused, take breaks, be productive</p>
      </header>

      <PomodoroTimer />
    </main>
  );
}

export default App;
