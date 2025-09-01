Đây là list các tính năng
1. Pomodoro Timer cơ bản
	•	Chu kỳ 25 phút làm việc → 5 phút nghỉ (có thể mở rộng cài đặt sau) -> đến lần thứ 4 thì sẽ break 15p or 30p rồi lại quay lại chu kỳ nghỉ 25p nghỉ 5p
	•	Âm thanh thông báo khi hết 1 phiên làm việc / nghỉ.
	•	Khi vào thời gian nghỉ, có thể bật nhạc lofi (user tùy chọn).
	•	Toàn màn hình overlay hoặc thông báo nổi để nhắc người dùng nghỉ ngơi.

2. Thông báo & Âm thanh
	•	Thông báo khi bắt đầu / kết thúc 1 chu kỳ.
	•	Tuỳ chọn bật/tắt âm thanh thông báo.
	•	Phát nhạc nền (lofi) trong thời gian nghỉ.

3. Lịch sử sử dụng (Local Storage)
	•	Lưu lại số lần sử dụng Pomodoro trong 1 ngày.
	•	Lưu thời gian bắt đầu – kết thúc từng phiên.
	•	Cho phép thêm ghi chú (ví dụ: “Ôn IELTS”, “Làm report”, “Viết code”).

Và có project structure mẫu như sau
pomodoro-app/
│── public/                      # Static files (favicon, manifest, sounds, etc.)
│   ├── sounds/                  # Âm thanh báo
│   │   ├── alarm.mp3
│   │   └── lofi.mp3
│   └── index.html
│
│── src/
│   ├── assets/                  # Icon, hình ảnh, font
│   │   └── logo.svg
│   │
│   ├── components/              # Reusable UI components
│   │   ├── TimerDisplay.tsx     # Hiển thị countdown
│   │   ├── Controls.tsx         # Start / Pause / Reset
│   │   ├── Notification.tsx     # Thông báo nổi / overlay
│   │   └── SoundToggle.tsx      # Toggle âm thanh
│   │
│   ├── features/                # Mỗi feature = 1 folder riêng
│   │   ├── pomodoro/
│   │   │   ├── PomodoroTimer.tsx
│   │   │   └── hooks/           # Hooks đặc thù của Pomodoro
│   │   │       └── usePomodoro.ts
│   │   │
│   │   ├── history/
│   │   │   ├── HistoryList.tsx
│   │   │   ├── AddNoteModal.tsx
│   │   │   └── utils.ts         # Format thời gian, xuất dữ liệu
│   │   │
│   │   └── settings/
│   │       ├── SettingsPanel.tsx
│   │       └── SoundSettings.tsx
│   │
│   ├── store/                   # Zustand store
│   │   ├── usePomodoroStore.ts  # State cho timer (time, status, cycle count…)
│   │   ├── useHistoryStore.ts   # State cho lịch sử Pomodoro
│   │   └── useSettingsStore.ts  # State cho config (âm thanh, nhạc nền…)
│   │
│   ├── utils/                   # Hàm tiện ích chung
│   │   ├── time.ts              # Format giây -> mm:ss
│   │   ├── notification.ts      # Web Notification API wrapper
│   │   └── sound.ts             # Điều khiển audio (play/stop)
│   │
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point ReactDOM
│   └── index.css                # Global style
│
│── package.json
└── tsconfig.json

Trước mắt hãy triển khai tính năng mục 1. Pomodoro Timer cơ bản trước cho tôi với UI style là Emotional Design, follow theo project structure trên