import { useState, useEffect, useRef } from 'react';

interface DailyGratitudeProps {
  onProceed: (gratitude: string) => void;
}

export const DailyGratitude = ({ onProceed }: DailyGratitudeProps) => {
  const questionText = "3 Things you're\ngrateful for today?";
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [gratitude, setGratitude] = useState('');
  const [showProceed, setShowProceed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Typing animation effect
  useEffect(() => {
    setDisplayedQuestion('');
    setShowInput(false);
    setShowProceed(false);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= questionText.length) {
        setDisplayedQuestion(questionText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowInput(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }, 300);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [questionText]);

  // Show proceed button when input is sufficient
  useEffect(() => {
    if (gratitude.trim().length > 10) {
      setShowProceed(true);
    } else {
      setShowProceed(false);
    }
  }, [gratitude]);

  // Auto-expand textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [gratitude]);

  const handleProceed = () => {
    if (gratitude.trim().length > 10) {
      onProceed(gratitude);
    }
  };

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
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink::after {
          content: '';
          display: inline-block;
          width: 3px;
          height: 1em;
          background: white;
          margin-left: 8px;
          animation: blink 1s infinite;
        }
        .fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        textarea {
          caret-color: white;
        }
        textarea::placeholder {
          opacity: 0;
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

      {/* Header Section */}
      <div className="relative z-10 pt-10 pb-8 fade-in">
        <h1 className="text-2xl font-medium text-zinc-400">BeingOne</h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 pt-8 pb-4 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="mb-8">
          <h2
            className={`text-[2.5rem] leading-[1.2] font-light tracking-tight whitespace-pre-line ${!showInput ? 'cursor-blink' : ''}`}
            style={{ minHeight: '120px' }}
          >
            {displayedQuestion}
          </h2>
        </div>

        {showInput && (
          <div className="fade-in-up pb-4">
            <textarea
              ref={inputRef}
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="w-full bg-transparent text-lg font-light leading-relaxed focus:outline-none resize-none text-white overflow-hidden"
              style={{ caretColor: 'white', height: 'auto' }}
              rows={1}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Proceed Button */}
      {showProceed && (
        <div className="relative z-10 pb-8 fade-in-up">
          <button
            onClick={handleProceed}
            className="w-full glass-morphism rounded-[2rem] px-8 py-6 font-medium text-lg tracking-wide text-white hover:bg-white/[0.06] transition-all duration-500 active:scale-[0.98] group relative overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative text-center">
              <span>Proceed</span>
            </div>
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
