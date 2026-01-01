# BeingOne - Daily Tracker

A beautiful dark-themed daily tracking app for logging gratitude and daily habits. Built with React + TypeScript + Vite, featuring the same sleek design as the original BeingOne meditation app.

## Features

- **Daily Gratitude Journaling**: Log 3 things you're grateful for each day
- **Habit Tracking**: Track 6 daily habits:
  - Meditate
  - Slept well
  - Ate well
  - Learn
  - Exercise
  - Socialize
- **Progress Dashboard**: View your habit completion percentages since joining
- **Profile**: Simple user profile with join date
- **Offline First**: All data stored in localStorage (no backend required)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually http://localhost:5173)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## How It Works

1. **First Time**: Enter your username to get started
2. **Daily Flow**:
   - Enter 3 things you're grateful for
   - Check off completed habits for the day
   - View your dashboard with habit statistics
3. **Dashboard**: Shows percentage of days you've completed each habit since joining
4. **Profile**: Click the profile icon (top right) to view your profile

## Data Storage

All data is stored locally in your browser's localStorage. No backend, no database, completely private!

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- Google Fonts (Reenie Beanie)
