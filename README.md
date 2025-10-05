Online Quiz Application

Overview
This is a full‑stack quiz application where users can take a timed quiz and see their final score with detailed per‑question feedback.

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
This starts the API (default: http://localhost:3000 or per hosting config).

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
This runs lightweight Node tests for the scoring utility at `backend/utils/score.js`.

Assumptions & Design Choices
- Serverless friendly: `backend/db.js` provides an in‑memory mock to avoid native DB dependencies during deployment. It can be replaced with SQLite/`better-sqlite3` by swapping the implementation and seeding a `questions` table.
- Security UX: Quiz attempts to run in fullscreen and warns on focus/visibility changes; second violation triggers auto‑submission.
- Simplicity: No auth or persistence of user submissions; focus is on quiz flow and scoring.
- Caching: Frontend caches questions for a few minutes to reduce API calls.

Future Improvements
- Replace mock DB with SQLite and a seed script.
- Add E2E tests (Playwright) for the full quiz flow.
- Add categories/multiple quizzes and basic auth.

