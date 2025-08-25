# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Tauri-based desktop pomodoro timer application with a React frontend. The project uses Vite for development and Rust for the backend.

## Architecture
- **Frontend**: React 19 + Vite running on port 1420
- **Backend**: Tauri v2 with Rust backend
- **Communication**: Tauri commands for frontend-backend communication

### Key Files
- `src/App.jsx` - Main React component
- `src-tauri/src/lib.rs` - Tauri backend with command handlers
- `src-tauri/src/main.rs` - Application entry point
- `src-tauri/tauri.conf.json` - Tauri configuration

## Development Commands

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Tauri Development
```bash
npm run tauri dev    # Start Tauri dev mode (runs frontend + backend)
npm run tauri build  # Build desktop application
```

## Project Structure
```
src/                 # React frontend source
src-tauri/src/       # Rust backend source
src-tauri/icons/     # Application icons
public/              # Static assets
```

## Backend Commands
Tauri commands are defined in `src-tauri/src/lib.rs` and called from React using `invoke()` from `@tauri-apps/api/core`.

Current commands:
- `greet(name: &str)` - Example greeting command

## Configuration Notes
- Tauri runs on fixed port 1420 in development
- Window size: 800x600 pixels
- Application identifier: `com.isaacnguyen.pomodoro_timer`