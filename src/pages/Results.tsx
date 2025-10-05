// src/pages/Results.tsx
import { JSX, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedArrow from "../components/AnimatedArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faBook,
  faMedal,
  faCheck,
  faTimes,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

interface QuizResult {
  score: number;
  total: number;
  results: Array<{
    id: number;
    question: string;
    correctOption: string;
    userAnswer: string;
    isCorrect: boolean;
  }>;
}

export default function Results(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  // handle missing state gracefully
  const state = (location.state ?? null) as QuizResult | null;
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const results = state?.results ?? [];

  const [showDetails, setShowDetails] = useState(false);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPassing = percentage >= 70;

  useEffect(() => {
    // Exit fullscreen when results are shown
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding!";
    if (percentage >= 80) return "Excellent Work!";
    if (percentage >= 70) return "Well Done!";
    if (percentage >= 60) return "Good Effort!";
    return "Keep Learning!";
  };

  return (
    <div className="exam-container min-h-screen bg-pattern-dots">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-float"
            style={{
              background: "linear-gradient(135deg, var(--primary-warm), var(--accent-gold))",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <FontAwesomeIcon icon={faTrophy} className="text-4xl text-white" />
          </motion.div>

          <motion.h1
            className="text-5xl font-display font-bold gradient-text-warm mb-4 text-shadow-strong"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Journey Complete!
          </motion.h1>

          <motion.p
            className="text-xl font-body font-semibold text-shadow-soft"
            style={{ color: "var(--primary-deep)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {getScoreMessage()}
          </motion.p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          className="card mb-8"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-strong)",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="p-8 text-center text-white"
            style={{
              background: "linear-gradient(135deg, var(--primary-warm), var(--accent-gold))",
              borderRadius: "1.5rem 1.5rem 0 0",
            }}
          >
            <motion.div
              className="text-3xl font-mono font-bold mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              {score}/{total}
            </motion.div>
            <div className="text-2xl font-display font-semibold mb-1">Your Achievement</div>
            <div className="text-lg opacity-90">{percentage}% Mastery</div>
          </div>

          <div className="p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-body font-semibold" style={{ color: "var(--primary-deep)" }}>
                  Performance Analysis
                </span>
                <span className="text-base font-mono font-bold" style={{ color: "var(--primary-deep)" }}>
                  {percentage}%
                </span>
              </div>
              <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "var(--neutral-cream)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isPassing
                      ? "linear-gradient(135deg, var(--success-mint), var(--primary-cool))"
                      : "linear-gradient(135deg, var(--error-coral), var(--primary-warm))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 1.0, duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Performance Message */}
            <motion.div
              className="text-center p-6 rounded-xl"
              style={{
                background: isPassing
                  ? "linear-gradient(135deg, rgba(26, 188, 156, 0.1), rgba(78, 205, 196, 0.1))"
                  : "linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(255, 107, 107, 0.1))",
                border: `2px solid ${isPassing ? "var(--success-mint)" : "var(--error-coral)"}`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div
                className="text-2xl font-display font-bold mb-3 flex items-center justify-center space-x-2"
                style={{ color: isPassing ? "var(--success-mint)" : "var(--error-coral)" }}
              >
                <FontAwesomeIcon icon={isPassing ? faMedal : faBook} />
                <span>{isPassing ? "Outstanding!" : "Keep Growing!"}</span>
              </div>
              <p className="text-base font-body" style={{ color: "var(--primary-deep)" }}>
                {isPassing
                  ? "Your knowledge shines bright! You've mastered this challenge with excellence."
                  : "Every expert was once a beginner. Your journey of learning continues!"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Detailed Results Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Question Review</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {showDetails ? "Hide Details" : "Show Details"}
              </button>
            </div>
          </div>

          {showDetails && (
            <motion.div
              className="p-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {results.map((result, index) => (
                <motion.div
                  key={result.id ?? index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.28 }}
                  className={`p-6 rounded-xl border-2 ${
                    result.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        result.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={result.isCorrect ? faCheck : faTimes} />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{result.question}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">Your Answer:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              result.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {result.userAnswer || "Not answered"}
                          </span>
                        </div>

                        {!result.isCorrect && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600">Correct Answer:</span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {result.correctOption}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => {
              // Use replace to clear navigation history and avoid white screen
              navigate("/", { replace: true });
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <AnimatedArrow size={20} direction="right" />
            <span className="ml-2">Take Another Quiz</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-gray-600 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPrint} />
            <span>Print Results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
