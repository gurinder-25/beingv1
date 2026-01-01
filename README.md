# BeingOne - Daily Tracker

A beautiful dark-themed daily tracking PWA for logging gratitude and daily habits. Built with React + TypeScript + Vite, featuring the same sleek design as the original BeingOne meditation app.

## Features

- **Progressive Web App (PWA)**: Install on any device, works offline
- **Daily Gratitude Journaling**: Log 3 things you're grateful for each day (with typing animation!)
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

### 1. Install dependencies:
```bash
npm install
```

### 2. Generate PWA Icons (Important!)
Open `public/generate-icons.html` in your browser and save the icons as `icon-192.png` and `icon-512.png` in the `public` folder.

See [PWA_SETUP.md](./PWA_SETUP.md) for detailed instructions.

### 3. Run the development server:
```bash
npm run dev
```

### 4. Install the app:
- Desktop: Look for the install icon (⊕) in the Chrome address bar
- Mobile: Tap Share > Add to Home Screen

Open your browser to the URL shown (usually http://localhost:5173)

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
