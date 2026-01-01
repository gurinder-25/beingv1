import { useState } from 'react';

interface DailyChecklistProps {
  onProceed: (habits: {
    meditated: boolean;
    sleptWell: boolean;
    ateWell: boolean;
    learned: boolean;
    exercised: boolean;
    socialized: boolean;
  }) => void;
}

export const DailyChecklist = ({ onProceed }: DailyChecklistProps) => {
  const [habits, setHabits] = useState({
    meditated: false,
    sleptWell: false,
    ateWell: false,
    learned: false,
    exercised: false,
    socialized: false,
  });

  const toggleHabit = (habit: keyof typeof habits) => {
    setHabits((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  const habitItems = [
    { key: 'meditated', label: 'Meditated' },
    { key: 'sleptWell', label: 'Slept well' },
    { key: 'ateWell', label: 'Ate well' },
    { key: 'learned', label: 'Learned' },
    { key: 'exercised', label: 'Exercised' },
    { key: 'socialized', label: 'Socialized' },
  ];

  return (
    <div className="h-screen bg-black text-white flex flex-col px-6 relative overflow-hidden">
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 255, 255, 0.08);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .glow-orb {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Ambient Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-[0.02] blur-3xl glow-orb" />
      <div className="absolute bottom-60 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl glow-orb" style={{ animationDelay: '2s' }} />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Header Section */}
        <div className="relative z-10 pt-10 pb-8 fade-in">
          <h1 className="text-2xl font-medium text-zinc-400 mb-5">BeingOne</h1>
          <h2 className="text-4xl font-light tracking-tight">
            How many you<br />got today?
          </h2>
        </div>

        {/* Main Content - Checklist */}
        <div className="relative z-10 py-8">
          {/* Checklist Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm tracking-[0.2em] text-zinc-500 uppercase">Daily Habits</span>
          </div>

          {/* Habit Checkboxes */}
          <div className="space-y-4 fade-in" style={{ animationDelay: '0.2s' }}>
            {habitItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleHabit(key as keyof typeof habits)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-all group"
              >
                <span className="text-lg font-light tracking-tight">{label}</span>
                <div
                  className={`w-6 h-6 rounded-md border-2 transition-all ${
                    habits[key as keyof typeof habits]
                      ? 'bg-white border-white'
                      : 'border-zinc-600 group-hover:border-zinc-500'
                  }`}
                >
                  {habits[key as keyof typeof habits] && (
                    <svg
                      className="w-full h-full p-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="relative z-10 pt-4 pb-8 fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => onProceed(habits)}
            className="w-full glass-morphism rounded-[2rem] p-5 hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative text-center">
              <h3 className="text-lg font-semibold tracking-tight">Proceed</h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
