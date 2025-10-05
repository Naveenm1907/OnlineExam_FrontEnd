import React from "react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
}

interface QuestionCardProps {
  question: Question;
  selected?: string;
  onSelect: (option: string) => void;
}

export default function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  return (
    <div className="p-8">
      <motion.h2 
        className="text-2xl font-display font-bold mb-8 leading-relaxed text-shadow-soft"
        style={{ color: 'var(--primary-deep)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {question.text}
      </motion.h2>
      
      <div className="space-y-4">
        {Object.entries(question.options).map(([key, val], index) => (
          <motion.label 
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`group block border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] hover:rotate-0.5 ${
              selected === key 
                ? "border-gradient shadow-strong" 
                : "border-transparent hover:shadow-medium"
            }`}
            style={{
              background: selected === key 
                ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(243, 156, 18, 0.1))'
                : 'rgba(255, 255, 255, 0.8)',
              border: selected === key 
                ? '2px solid transparent'
                : '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            whileHover={{ 
              scale: 1.01, 
              rotateY: selected === key ? 0 : 1,
              boxShadow: 'var(--shadow-medium)'
            }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="radio"
              className="hidden"
              checked={selected === key}
              onChange={() => onSelect(key)}
            />
            <div className="flex items-center space-x-4">
              <motion.div 
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-bold text-base transition-all ${
                  selected === key 
                    ? "animate-pulse-glow" 
                    : "group-hover:scale-105"
                }`}
                style={{
                  background: selected === key 
                    ? 'linear-gradient(135deg, var(--primary-warm), var(--accent-gold))'
                    : 'var(--neutral-cream)',
                  borderColor: selected === key 
                    ? 'transparent'
                    : 'var(--neutral-sage)',
                  color: selected === key ? 'white' : 'var(--neutral-charcoal)',
                  boxShadow: selected === key ? 'var(--shadow-glow)' : 'none'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selected === key ? "✓" : key}
              </motion.div>
              <span 
                className="text-lg font-body font-medium group-hover:font-semibold transition-all"
                style={{ 
                  color: selected === key ? 'var(--primary-deep)' : 'var(--neutral-charcoal)'
                }}
              >
                {val}
              </span>
            </div>
          </motion.label>
        ))}
      </div>
    </div>
  );
}
