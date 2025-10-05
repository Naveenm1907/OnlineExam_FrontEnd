import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
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
      <motion.div 
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >  
          {/* Main Title */}
          <motion.h1 
            className="text-5xl font-display gradient-text-warm mb-4 text-shadow-soft"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Mind Quest
          </motion.h1>
          
          <motion.p 
            className="text-xl font-body text-shadow-soft mb-3"
            style={{ color: 'var(--primary-deep)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Where Knowledge Meets Challenge
          </motion.p>
          
          {/* <motion.p 
            className="text-base font-body max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--neutral-charcoal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Embark on an intellectual journey that tests your understanding, 
            challenges your thinking, and rewards your curiosity. 
            <span className="font-semibold gradient-text-cool"> Ready to begin?</span>
          </motion.p> */}
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          {/* Time Feature */}
          <motion.div 
            className="card-compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
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
          </motion.div>
          
          {/* Security Feature */}
          <motion.div 
            className="card-compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
          >
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
          </motion.div>
          
          {/* Results Feature */}
          <motion.div 
            className="card-compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button 
            onClick={startQuiz}
            className="btn btn-primary text-lg px-12 py-4 font-display flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            <Suspense fallback={<span>→</span>}>
              <AnimatedArrow size={24} direction="right" />
            </Suspense>
            <span className="ml-2">Begin Your Journey</span>
          </motion.button>
          
          <motion.p 
            className="mt-4 text-sm font-body"
            style={{ color: 'var(--neutral-sage)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Click to enter fullscreen mode and start your intellectual adventure
          </motion.p>
        </motion.div>

        {/* Warning Notice */}
        <motion.div 
          className="mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
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
                This exam will automatically enter fullscreen mode for optimal experience and security.
              </p>
              <p className="font-body text-xs" style={{ color: 'var(--neutral-sage)' }}>
                Switching tabs or leaving fullscreen will result in automatic submission.
              </p>
            </div>
          </div>
        </motion.div>
    </motion.div>
    </div>
  );
}
