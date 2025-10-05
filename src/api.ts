import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
}

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

// Simple in-memory cache for questions
let questionsCache: Question[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchQuestions = async (): Promise<Question[]> => {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (questionsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return questionsCache;
  }
  
  try {
    const response = await axios.get(`${API_URL}/questions`, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    // Update cache
    questionsCache = response.data;
    cacheTimestamp = now;
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    throw error;
  }
};

export const submitAnswers = async (answers: Record<number, string>): Promise<QuizResult> => {
  try {
    const response = await axios.post(`${API_URL}/submit`, { answers }, {
      timeout: 15000, // 15 second timeout for submission
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Clear cache after submission
    questionsCache = null;
    cacheTimestamp = 0;
    
    return response.data;
  } catch (error) {
    console.error('Failed to submit answers:', error);
    throw error;
  }
};
