import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

// Lazy load animated components
const AnimatedTimer = lazy(() => import("../components/AnimatedTimer"));
const AnimatedSecurity = lazy(() => import("../components/AnimatedSecurity"));
const AnimatedGrowth = lazy(() => import("../components/AnimatedGrowth"));
const AnimatedArrow = lazy(() => import("../components/AnimatedArrow"));

export default function Start() {
  const navigate = useNavigate();

  const startQuiz = () => {
    // Navigate to quiz - fullscreen will be handled automatically in Quiz component
    navigate("/quiz");
  };

  return (
    <div className="exam-container min-h-screen flex items-center justify-center p-4 bg-pattern-dots">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Main Title */}
          <h1 className="text-5xl font-display gradient-text-warm mb-4 text-shadow-soft">
            Mind Quest
          </h1>
          
          <p 
            className="text-xl font-body text-shadow-soft mb-3"
            style={{ color: 'var(--primary-deep)' }}
          >
            Where Knowledge Meets Challenge
          </p>
          
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Time Feature */}
          <div className="card-compact">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 mx-auto overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--primary-cool), var(--success-mint))' }}
              >
                <Suspense fallback={<div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />}>
                  <AnimatedTimer size={50} />
                </Suspense>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--primary-deep)' }}>
                Timed Adventure
              </h3>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--neutral-charcoal)' }}>
                Race against time in a carefully crafted challenge that rewards both speed and accuracy
              </p>
            </div>
          </div>
          
          {/* Security Feature */}
          <div className="card-compact">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 mx-auto overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--primary-warm))' }}
              >
                <Suspense fallback={<div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />}>
                  <AnimatedSecurity size={50} />
                </Suspense>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--primary-deep)' }}>
                Secure Environment
              </h3>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--neutral-charcoal)' }}>
                Experience a distraction-free zone designed to focus your mind and maximize your potential
              </p>
            </div>
          </div>
          
          {/* Results Feature */}
          <div className="card-compact">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-4 mx-auto overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--warning-amber))' }}
              >
                <Suspense fallback={<div className="w-12 h-12 bg-gray-200 rounded animate-pulse" />}>
                  <AnimatedGrowth size={50} />
                </Suspense>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--primary-deep)' }}>
                Instant Insights
              </h3>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--neutral-charcoal)' }}>
                Get detailed feedback and performance analytics to understand your strengths and growth areas
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={startQuiz}
            className="btn btn-primary text-lg px-12 py-4 font-display inline-flex items-center justify-center hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            <Suspense fallback={<span>→</span>}>
              <AnimatedArrow size={24} direction="right" />
            </Suspense>
            <span className="ml-2">Begin Your Journey</span>
          </button>
          
          <p 
            className="mt-4 text-sm font-body"
            style={{ color: 'var(--neutral-sage)' }}
          >
            Click to enter fullscreen mode and start your intellectual adventure
          </p>
        </div>

        {/* Warning Notice */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div 
            className="card-compact border-gradient"
            style={{
              background: 'rgba(255, 193, 7, 0.1)',
              border: '2px solid var(--warning-amber)'
            }}
          >
            <div className="flex items-center justify-center mb-3">
              <span className="text-2xl mr-2">⚠️</span>
              <h4 className="font-display text-lg font-semibold" style={{ color: 'var(--primary-deep)' }}>
                Important Guidelines
              </h4>
            </div>
            <div className="space-y-1 text-center">
              <p className="font-body text-sm" style={{ color: 'var(--neutral-charcoal)' }}>
                This exam requires a desktop or laptop computer (minimum 1024px width).
              </p>
              <p className="font-body text-sm" style={{ color: 'var(--neutral-charcoal)' }}>
                The exam automatically enforces fullscreen mode. You cannot exit fullscreen during the exam.
              </p>
              <p className="font-body text-xs" style={{ color: 'var(--neutral-sage)' }}>
                Any attempt to leave fullscreen or switch tabs will result in automatic re-entry and eventual submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
