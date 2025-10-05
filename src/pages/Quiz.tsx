import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchQuestions, submitAnswers } from "../api";
import QuestionCard from "../components/QuestionCard";

// Lazy load animated components
const AnimatedArrow = lazy(() => import("../components/AnimatedArrow"));

interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(true);
  const [violationCount, setViolationCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDeviceAllowed, setIsDeviceAllowed] = useState(true);
  const navigate = useNavigate();

  // Check device screen size (must be larger devices only)
  useEffect(() => {
    const checkDeviceSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Minimum dimensions: 1024px width (typical tablet landscape minimum)
      if (width < 1024 || height < 600) {
        setIsDeviceAllowed(false);
      } else {
        setIsDeviceAllowed(true);
      }
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Check fullscreen status and automatically enforce
  const checkFullscreenStatus = async () => {
    const fullscreenElement = document.fullscreenElement;
    const isCurrentlyFullscreen = !!fullscreenElement;
    setIsFullscreen(isCurrentlyFullscreen);
    
    // If not in fullscreen and quiz is active, automatically force fullscreen
    if (!isCurrentlyFullscreen && !loading && !isSubmitting) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.warn("Auto fullscreen enforcement failed:", error);
      }
    }
  };

  // Auto-request fullscreen and fetch questions
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setLoading(true);
        
        // Check initial fullscreen status
        checkFullscreenStatus();
        
        // Automatically request fullscreen
        if (!document.fullscreenElement) {
          try {
            await document.documentElement.requestFullscreen();
            // Small delay to ensure fullscreen is active
            await new Promise(resolve => setTimeout(resolve, 200));
            setIsFullscreen(true);
          } catch (fullscreenError) {
            console.warn("Automatic fullscreen request failed:", fullscreenError);
            setIsFullscreen(false);
            // Show a gentle notification but continue with quiz
            console.log("Quiz will continue in windowed mode. You can manually enter fullscreen if needed.");
          }
        } else {
          setIsFullscreen(true);
        }
        
        // Load questions
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load questions:", error);
        // Don't set loading to false immediately, let the error state handle it
      } finally {
        setLoading(false);
      }
    };
    
    initializeQuiz();
  }, []);

  // Timer with visual countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Continuous fullscreen monitoring - automatically enforce every second
  useEffect(() => {
    if (loading || isSubmitting) return;

    const fullscreenMonitor = setInterval(async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (error) {
          console.warn("Fullscreen enforcement failed:", error);
        }
      }
    }, 1000); // Check and enforce every second

    return () => clearInterval(fullscreenMonitor);
  }, [loading, isSubmitting]);

  // Advanced security measures
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation();
      }
    };

    const handleBlur = () => {
      handleViolation();
    };

    const handleFullscreenChange = async () => {
      // Update fullscreen status
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      // If exited fullscreen, automatically force it back immediately
      if (!isCurrentlyFullscreen && !loading && !isSubmitting) {
        handleViolation();
        // Force back to fullscreen immediately
        try {
          await document.documentElement.requestFullscreen();
        } catch (error) {
          console.warn("Failed to re-enter fullscreen:", error);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common cheating shortcuts
      if (e.ctrlKey && (e.key === 't' || e.key === 'n' || e.key === 'w')) {
        e.preventDefault();
        handleViolation();
      }
      if (e.key === 'F11') {
        e.preventDefault();
        handleViolation();
      }
      // Block Escape key to prevent fullscreen exit
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Prevent right-click
    document.addEventListener('selectstart', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [violationCount, loading, isSubmitting]);

  const handleViolation = useCallback(() => {
    if (violationCount === 0) {
      setViolationCount(1);
      setShowWarning(true);
      // Show warning briefly, system will auto-enforce fullscreen
      setTimeout(() => {
        setShowWarning(false);
        setViolationCount(0); // Reset after warning
      }, 2000);
    } else {
      // Second violation - auto submit
      handleSubmit();
    }
  }, [violationCount]);

  const handleSelect = (qid: number, option: string) => {
    setAnswers(a => ({ ...a, [qid]: option }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
    const result = await submitAnswers(answers);
    navigate("/results", { state: result });
    } catch (error) {
      console.error("Failed to submit answers:", error);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (time <= 30) return "text-red-600";
    if (time <= 60) return "text-orange-500";
    return "text-gray-600";
  };

  // Device size restriction screen
  if (!isDeviceAllowed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6">🖥️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Device Not Supported</h2>
          <p className="text-lg text-gray-600 mb-4">
            This exam requires a larger screen device for the best experience and proper monitoring.
          </p>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-700 font-medium mb-2">Minimum Requirements:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Screen width: 1024px or larger</li>
              <li>• Screen height: 600px or larger</li>
              <li>• Desktop, laptop, or large tablet in landscape mode</li>
            </ul>
          </div>
          <p className="text-gray-600">
            Please switch to a desktop or laptop computer to take this exam.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Preparing Your Exam</h2>
          <p className="text-gray-600 mb-4">Entering fullscreen mode and loading questions...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Questions</h2>
          <p className="text-gray-600 mb-6">Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="exam-container min-h-screen bg-pattern-grid">
      {/* Header */}
      <div 
        className="card-glass"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0 0 2rem 2rem'
        }}
      >
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <span className="text-2xl">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text-warm">Mind Quest</h1>
                <p className="text-sm font-body" style={{ color: 'var(--neutral-sage)' }}>
                  Question {current + 1} of {questions.length} • Journey Progress
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              {/* Fullscreen Status Indicator */}
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    isFullscreen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}
                ></div>
                <span className="text-xs font-mono" style={{ color: 'var(--neutral-sage)' }}>
                  {isFullscreen ? 'Fullscreen' : 'Windowed'}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="hidden md:block">
                <div 
                  className="w-40 h-3 rounded-full overflow-hidden"
                  style={{ background: 'var(--neutral-cream)' }}
                >
                  <motion.div 
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs font-mono mt-2 text-center" style={{ color: 'var(--neutral-sage)' }}>
                  {Math.round(progress)}% Complete
                </p>
              </div>
              
              {/* Timer */}
              <div className="text-center">
                <div 
                  className={`text-3xl font-mono font-bold ${getTimeColor()}`}
                  style={{
                    color: time <= 30 ? 'var(--error-coral)' : time <= 60 ? 'var(--warning-amber)' : 'var(--primary-deep)'
                  }}
                >
                  {formatTime(time)}
                </div>
                <p className="text-xs font-body" style={{ color: 'var(--neutral-sage)' }}>Time Remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="card"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            <QuestionCard 
              question={q} 
              selected={answers[q.id]} 
              onSelect={opt => handleSelect(q.id, opt)} 
            />
            
            {/* Navigation */}
            <div 
              className="px-8 py-8"
              style={{
                background: 'linear-gradient(135deg, var(--neutral-cream), rgba(255, 255, 255, 0.8))',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0 0 2rem 2rem'
              }}
            >
              <div className="flex justify-between items-center">
                <motion.button 
                  onClick={() => setCurrent(c => c - 1)}
                  disabled={current === 0}
                  className={`btn font-display flex items-center ${
                    current === 0 
                      ? 'btn-outline opacity-50 cursor-not-allowed' 
                      : 'btn-outline'
                  }`}
                  whileHover={current !== 0 ? { scale: 1.05 } : {}}
                  whileTap={current !== 0 ? { scale: 0.95 } : {}}
                >
                  <Suspense fallback={<span>←</span>}>
                    <AnimatedArrow size={16} direction="left" />
                  </Suspense>
                  <span className="ml-2">Previous</span>
                </motion.button>
                
                <div className="flex space-x-3">
                  {questions.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        index === current 
                          ? 'animate-pulse-glow' 
                          : answers[questions[index].id] 
                            ? 'animate-float' 
                            : ''
                      }`}
                      style={{
                        background: index === current 
                          ? 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))'
                          : answers[questions[index].id] 
                            ? 'linear-gradient(135deg, var(--success-mint), var(--primary-cool))'
                            : 'var(--neutral-sage)',
                        boxShadow: index === current ? 'var(--shadow-glow)' : 'none'
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                
                {current < questions.length - 1 ? (
                  <motion.button 
                    onClick={() => setCurrent(c => c + 1)}
                    className="btn btn-primary font-display flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">Next</span>
                    <Suspense fallback={<span>→</span>}>
                      <AnimatedArrow size={16} direction="right" />
                    </Suspense>
                  </motion.button>
                ) : (
                  <motion.button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn btn-secondary font-display px-12 flex items-center"
                    style={{
                      background: isSubmitting 
                        ? 'var(--neutral-sage)' 
                        : 'linear-gradient(135deg, var(--success-mint), var(--primary-cool))'
                    }}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <span className="mr-2">Complete Journey</span>
                        <Suspense fallback={<span>→</span>}>
                          <AnimatedArrow size={16} direction="right" />
                        </Suspense>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Violation Detected</h3>
              <p className="text-gray-600 mb-4">
                You attempted to leave the exam environment. 
              </p>
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-sm font-semibold text-red-600 mb-2">
                Automatically returning to fullscreen mode...
              </p>
              <p className="text-xs text-gray-500">
                Warning: Any further violations will result in immediate submission.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
