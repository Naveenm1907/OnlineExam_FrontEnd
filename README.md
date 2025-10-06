# Online Quiz Application

A full-stack, real-time quiz application with timed quizzes, automatic grading, and detailed performance feedback. Built with modern web technologies for a seamless user experience.

## 🌐 Live Demo

**Frontend**: [https://online-exam-front-end.vercel.app/](https://online-exam-front-end.vercel.app/)

## 📦 Repositories

- **Frontend**: [github.com/Naveenm1907/OnlineExam_FrontEnd](https://github.com/Naveenm1907/OnlineExam_FrontEnd)
- **Backend**: [github.com/Naveenm1907/OnlineExam_BackEnd](https://github.com/Naveenm1907/OnlineExam_BackEnd)

## ✨ Features

- **Timed Quizzes**: Countdown timer with auto-submission when time expires
- **Security Measures**: Fullscreen enforcement with warning system and auto-submit on violations
- **Instant Feedback**: Detailed results showing correct/incorrect answers with explanations
- **Smooth Animations**: Enhanced UI/UX with Framer Motion transitions
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Client-side Caching**: Optimized API calls with question caching
- **TypeScript Support**: Type-safe frontend development

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (serverless-ready)
- **Database**: In-memory mock (easily swappable with SQLite)
- **Testing**: Node.js built-in test runner

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Fetch API

## 📁 Project Structure

```
online-quiz-app/
├── backend/
│   ├── db.js                 # Database mock (in-memory)
│   ├── server.js             # Express app & API routes
│   ├── utils/
│   │   └── score.js          # Scoring logic
│   ├── tests/
│   │   └── score.test.js     # Unit tests
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── pages/            # Start, Quiz, Results pages
    │   ├── services/         # API service layer
    │   └── App.tsx           # Main application
    ├── .env                  # Environment configuration
    └── package.json
```

## 🚀 API Endpoints

### `GET /api/questions`
Fetches quiz questions without revealing correct answers.

**Response:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": {
        "A": "London",
        "B": "Berlin",
        "C": "Paris",
        "D": "Madrid"
      }
    }
  ]
}
```

### `POST /api/submit`
Submits user answers and returns score with detailed feedback.

**Request:**
```json
{
  "answers": {
    "1": "C",
    "2": "A"
  }
}
```

**Response:**
```json
{
  "score": 8,
  "total": 10,
  "results": [
    {
      "id": 1,
      "correct": true,
      "userAnswer": "C",
      "correctAnswer": "C",
      "question": "What is the capital of France?",
      "explanation": "Paris is the capital city of France."
    }
  ]
}
```

## 💻 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Clone and navigate to the backend repository:
```bash
git clone https://github.com/Naveenm1907/OnlineExam_BackEnd.git
cd OnlineExam_BackEnd
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Clone and navigate to the frontend repository:
```bash
git clone https://github.com/Naveenm1907/OnlineExam_FrontEnd.git
cd OnlineExam_FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

4. Start the development server:
```bash
npm run dev
```

Open your browser to the URL shown by Vite (typically `http://localhost:5173`)

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

Runs unit tests for the scoring utility located at `backend/utils/score.js`

## 🔒 Security Features

- **Fullscreen Enforcement**: Quiz attempts to run in fullscreen mode
- **Violation Detection**: First violation triggers a warning modal
- **Auto-submission**: Second violation automatically submits the quiz
- **Client-side Validation**: Answer format validation before submission

## 🎯 Design Decisions

### Serverless-Friendly Architecture
The backend uses an in-memory database mock (`backend/db.js`) to avoid native database dependencies, making it ideal for serverless deployments on platforms like Vercel, Netlify, or AWS Lambda.

### No Authentication
Focus is on core quiz functionality. Authentication can be added as a future enhancement.

### Client-side Question Caching
Questions are cached briefly on the frontend to minimize API calls and improve performance.

### Simplicity First
No persistent storage of submissions or user accounts keeps the application lightweight and focused on the quiz-taking experience.

## 🚧 Future Improvements

- [ ] **Database Integration**: Replace in-memory mock with SQLite using `better-sqlite3`
- [ ] **E2E Testing**: Implement Playwright tests for complete user flows
- [ ] **Multiple Quiz Categories**: Support for different quiz topics and difficulty levels
- [ ] **User Authentication**: JWT-based auth for user accounts
- [ ] **Quiz History**: Store and display past quiz attempts
- [ ] **Leaderboard**: Global and category-specific leaderboards
- [ ] **Question Bank Management**: Admin interface for CRUD operations
- [ ] **Progress Tracking**: Analytics and progress visualization
- [ ] **Social Features**: Share results and challenge friends
- [ ] **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Naveen M**

- GitHub: [@Naveenm1907](https://github.com/Naveenm1907)

## 🙏 Acknowledgments

- Built with modern React best practices
- Inspired by online examination platforms
- UI/UX design patterns from leading quiz applications

---

Made with ❤️ by Naveen Mayandi