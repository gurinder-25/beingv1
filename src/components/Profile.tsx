import { useEffect, useState } from 'react';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { getUserProfile, getAllEntries } from '../utils/storage';

interface ProfileProps {
  onBack: () => void;
}

export const Profile = ({ onBack }: ProfileProps) => {
  const [profile, setProfile] = useState<{ username: string; joinedDate: string } | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const userProfile = getUserProfile();
    setProfile(userProfile);
    const entries = getAllEntries();
    setTotalEntries(entries.length);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full opacity-[0.02] blur-3xl" />
      <div className="absolute bottom-60 left-10 w-80 h-80 bg-white rounded-full opacity-[0.015] blur-3xl" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800/50 overflow-hidden p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center border-2 border-zinc-800 mb-4">
              <UserIcon size={40} className="text-zinc-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              {profile?.username || 'User'}
            </h2>
            {profile?.joinedDate && (
              <p className="text-zinc-500 text-sm">
                Member since {formatDate(profile.joinedDate)}
              </p>
            )}
          </div>

          {/* Stats Summary */}
          <div className="border-t border-zinc-800 pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/50">
                <span className="text-zinc-400">Total Entries</span>
                <span className="text-white font-bold">{totalEntries}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/50">
                <span className="text-zinc-400">Habits Tracked</span>
                <span className="text-white font-bold">6</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 p-6 bg-zinc-900/20 border border-zinc-800/30 rounded-3xl">
          <p className="text-zinc-500 text-sm text-center">
            Keep logging daily to see your progress grow! Your data is stored locally and private.
          </p>
        </div>
      </div>
    </div>
  );
};
