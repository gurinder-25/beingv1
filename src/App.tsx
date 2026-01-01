import { useState, useEffect, useRef } from 'react';
import { DailyGratitude } from './components/DailyGratitude';
import { DailyChecklist } from './components/DailyChecklist';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import {
  getUserProfile,
  saveUserProfile,
  hasCompletedToday,
  saveDailyEntry,
  getTodayDate,
} from './utils/storage';

type Screen = 'welcome' | 'gratitude' | 'checklist' | 'dashboard' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [tempGratitude, setTempGratitude] = useState('');
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  useEffect(() => {
    // Check if user exists
    const profile = getUserProfile();
    if (profile) {
      setUsername(profile.username);
      // Check if they've completed today's entry
      if (hasCompletedToday()) {
        setCurrentScreen('dashboard');
      } else {
        setCurrentScreen('gratitude');
      }
    } else {
      setCurrentScreen('welcome');
    }
  }, []);

  const handleWelcomeSubmit = () => {
    if (inputUsername.trim()) {
      const newProfile = {
        username: inputUsername.trim(),
        joinedDate: getTodayDate(),
      };
      saveUserProfile(newProfile);
      setUsername(inputUsername.trim());
      setCurrentScreen('gratitude');
    }
  };

  const handleGratitudeProceed = (gratitude: string) => {
    setTempGratitude(gratitude);
    setCurrentScreen('checklist');
  };

  const handleChecklistProceed = (habits: {
    meditated: boolean;
    sleptWell: boolean;
    ateWell: boolean;
    learned: boolean;
    exercised: boolean;
    socialized: boolean;
  }) => {
    // Save the complete entry
    saveDailyEntry({
      date: getTodayDate(),
      gratitude: tempGratitude,
      habits,
    });
    setCurrentScreen('dashboard');
  };

  const handleOpenProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBackFromProfile = () => {
    setCurrentScreen('dashboard');
  };

  // Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <div className="h-screen bg-black text-white flex flex-col px-6 relative overflow-hidden">
        {/* Ambient Background Elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-[0.02] blur-3xl" />
        <div className="absolute bottom-60 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        {/* Header Section */}
        <div className="relative z-10 pt-10 pb-8">
          <h1 className="text-2xl font-medium text-zinc-400">BeingOne</h1>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 pt-8 pb-4 flex flex-col">
          <div className="mb-12">
            <h2 className="text-4xl font-light tracking-tight leading-relaxed">
              Welcome!<br />What's your name?
            </h2>
          </div>

          <div className="flex-1 mb-6">
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleWelcomeSubmit()}
              className="w-full bg-transparent border-b-2 border-zinc-700 outline-none text-2xl placeholder-zinc-600 text-white pb-3 focus:border-zinc-500 transition-all"
              placeholder="Your name..."
              autoFocus
            />
          </div>
        </div>

        {/* Start Button */}
        <div className="relative z-10 pb-8">
          <button
            onClick={handleWelcomeSubmit}
            disabled={!inputUsername.trim()}
            className="w-full bg-white text-black rounded-2xl py-4 text-lg font-semibold hover:bg-zinc-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Start
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  // Main Flow Screens
  return (
    <>
      {currentScreen === 'gratitude' && (
        <DailyGratitude onProceed={handleGratitudeProceed} />
      )}
      {currentScreen === 'checklist' && (
        <DailyChecklist onProceed={handleChecklistProceed} />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard onOpenProfile={handleOpenProfile} />
      )}
      {currentScreen === 'profile' && (
        <Profile onBack={handleBackFromProfile} />
      )}
    </>
  );
}

export default App;
