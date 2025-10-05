Online Quiz Application

Overview
This is a full‑stack quiz application where users can take a timed quiz and see their final score with detailed per‑question feedback.

Repositories
- Frontend: https://github.com/Naveenm1907/OnlineExam_FrontEnd
- Backend: https://github.com/Naveenm1907/OnlineExam_BackEnd

Tech Stack
- Backend: Node.js, Express (serverless‑friendly), in‑memory DB mock (easily swappable to SQLite)
- Frontend: React, Vite, TypeScript, Tailwind, Framer Motion

Project Structure
- backend/ — Express app with endpoints
- frontend/ — React SPA with Start, Quiz, and Results pages

API
- GET /api/questions → Returns questions without correct answers
- POST /api/submit { answers: { [id]: "A|B|C|D" } } → Returns { score, total, results[] }

Local Setup
1) Backend
```
cd backend
npm install
npm start
```
This starts the API (default: http://localhost:3000).

2) Frontend
```
cd frontend
npm install
echo VITE_API_URL=http://localhost:3000/api > .env
npm run dev
```
Open the dev server URL printed by Vite (usually http://localhost:5173).

Running Tests (Backend)
```
cd backend
npm test
```
Runs lightweight Node tests for the scoring utility at `backend/utils/score.js`.

Assumptions & Design Choices
- Serverless friendly: `backend/db.js` provides an in‑memory mock to avoid native DB dependencies. Swap with SQLite/`better-sqlite3` and seed a `questions` table if needed.
- Security UX: Quiz tries fullscreen; first violation shows a warning, second auto‑submits.
- Simplicity: No auth or persistence of submissions; focus is on quiz flow and scoring.
- Caching: Frontend caches questions briefly to reduce API calls.

Future Improvements
- Replace mock DB with SQLite and a seed script.
- E2E tests (Playwright) for the full quiz flow.
- Multiple quizzes/categories and basic auth.

