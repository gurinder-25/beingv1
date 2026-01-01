import { useEffect, useState } from 'react';
import { User, Sparkles } from 'lucide-react';
import { getHabitStats, getUserProfile } from '../utils/storage';

interface DashboardProps {
  onOpenProfile: () => void;
}

export const Dashboard = ({ onOpenProfile }: DashboardProps) => {
  const [stats, setStats] = useState({
    meditated: 0,
    sleptWell: 0,
    ateWell: 0,
    learned: 0,
    exercised: 0,
    socialized: 0,
  });
  const [username, setUsername] = useState('username');

  useEffect(() => {
    const habitStats = getHabitStats();
    setStats(habitStats);

    const profile = getUserProfile();
    if (profile) {
      setUsername(profile.username);
    }
  }, []);

  const statBoxes = [
    { label: 'Meditated', value: stats.meditated },
    { label: 'Slept well', value: stats.sleptWell },
    { label: 'Ate well', value: stats.ateWell },
    { label: 'Learned', value: stats.learned },
    { label: 'Exercised', value: stats.exercised },
    { label: 'Socialized', value: stats.socialized },
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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
        .float-animation {
          animation: float 6s ease-in-out infinite;
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
        {/* Header Section with Profile Button */}
        <div className="relative z-10 pt-10 pb-8 fade-in">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-medium text-zinc-400">BeingOne</h1>
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <User size={20} className="text-zinc-400" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-light tracking-tight">
              Hi, <span className="font-medium">{username}</span>
            </h2>
            <Sparkles size={28} className="text-zinc-600 float-animation" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 py-8">
          <div className="w-full max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-2 gap-4">
              {statBoxes.map((stat, index) => (
                <div
                  key={index}
                  className="glass-morphism rounded-[2rem] p-6 relative overflow-hidden hover:bg-white/[0.06] transition-all duration-500 group"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold mb-3 text-zinc-100">
                      {stat.value}%
                    </div>
                    <div className="text-sm text-zinc-500 font-medium text-center">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="relative z-10 pt-4 pb-8 fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="glass-morphism rounded-[2rem] p-6 text-center">
            <p className="text-sm text-zinc-500">
              Keep logging daily to track your progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
