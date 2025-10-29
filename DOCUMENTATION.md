# Health & Wellness App — Project Documentation

This documentation describes the codebase, APIs, data models, setup steps, recommended improvements and how to publish the project to GitHub and create a PDF of this document.

Contents
- Project summary
- How the system works (architecture)
- Server API reference (concise)
- Database models
- How to run locally
- How to generate a PDF of this documentation
- How to create a GitHub repository and push the code (PowerShell commands)
- Security notes and suggested improvements

Project summary

This repository implements a Prakriti analysis application: users register/login, fill out an Ayurvedic traits questionnaire, the backend computes Pitta/Vata/Kapha composition and returns recommendations. Submissions are stored and displayed in charts.

Architecture

- Frontend: React app in `frontend/` that calls backend endpoints. Token-based authentication: JWT stored in localStorage by the current client.
- Backend: Express API in `backend/` with two main route groups:
  - `/api/auth` for registration/login
  - `/api/prakriti` for form submission and data retrieval
- Database: MongoDB via Mongoose (models: User, Prakriti)

Server API (short reference)

Base: http://localhost:5000 (or set PORT in backend .env)

Auth
- POST /api/auth/register
  - Body: { username, email, password }
  - Response: { token, message }

- POST /api/auth/login
  - Body: { email, password }
  - Response: { token, message }

Prakriti
- POST /api/prakriti/submit
  - Headers: Authorization: Bearer <token>
  - Body: traits: skin, bodyBuild, hair, eyes, mindset, memory, emotions, diet, sleep, energy, weather, stress
  - Response: { message, analysis: { pitta, vata, kapha }, recommendations, healthSummary }

- GET /api/prakriti/data
  - Headers: Authorization: Bearer <token>
  - Response: [PrakritiDocuments]

Data models (Mongoose summary)

- User:
  - username: String (unique)
  - email: String (unique)
  - password: String (bcrypt hash)

- Prakriti:
  - userId: ObjectId (ref User)
  - trait fields: String
  - analysis: { pitta:Number, vata:Number, kapha:Number }
  - recommendations: [String]
  - healthSummary: String
  - createdAt: Date

Run locally — full steps

1. Backend

```powershell
cd backend
npm install
# create a file backend/.env with at least:
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_secret
npm start
```

2. Frontend

```powershell
cd frontend
npm install
npm start
```

Generate PDF of this document (two easy options)

Option A — Using Pandoc (recommended for clean PDF)

1. Install Pandoc: https://pandoc.org/installing.html
2. Run in project root (PowerShell):

```powershell
pandoc DOCUMENTATION.md -o DOCUMENTATION.pdf --pdf-engine=xelatex
```

Option B — Using the browser or VS Code

1. Open `DOCUMENTATION.md` in VS Code or GitHub preview.
2. Print → Save as PDF (choose layout/scale as desired).

Create a GitHub repository and push (PowerShell)

Prereqs (choose one):
- `gh` (GitHub CLI) installed and authenticated (recommended)
- OR a GitHub account and use the website to create a repo

Method 1 — GitHub CLI (fast)

```powershell
cd "c:\Users\LENOVO\OneDrive\Documents\college Project\health-wellness-app"
git init
git add -A
git commit -m "Initial commit: Health & Wellness App"
# create repo on GitHub (private by default, change flags as needed)
gh repo create my-health-wellness-app --private --source=. --remote=origin --push
# after this, the 'origin' remote is set and branch pushed
```

Method 2 — Manual (without gh)

1. Create a new repository on github.com (click + → New repository). Note the remote URL (e.g., https://github.com/youruser/my-health-wellness-app.git).
2. Run locally:

```powershell
cd "c:\Users\LENOVO\OneDrive\Documents\college Project\health-wellness-app"
git init
git add -A
git commit -m "Initial commit: Health & Wellness App"
git remote add origin https://github.com/youruser/my-health-wellness-app.git
git branch -M main
git push -u origin main
```

Additional Git tips

- Add `backend/.env` to `.gitignore` to avoid committing secrets.
- Consider creating a `.github/workflows/ci.yml` later for CI tests.

Security notes & quick wins

- Do not store JWT in localStorage for production; use HttpOnly cookies.
- Add input validation (e.g., `express-validator` or `Joi`).
- Add rate limiting to auth endpoints (e.g., `express-rate-limit`).
- Improve error messages and centralize error handling middleware.

Suggested next steps (small PRs I can do)

1. Add `backend/.env.example` and update `.gitignore` to exclude `.env`.
2. Add `express-validator` checks to `auth` and `prakriti` routes.
3. Add README badges and a short CONTRIBUTING.md.
4. (Optional) Replace JWT localStorage approach with secure cookies and refresh tokens.

If you'd like, I can apply the small PRs above automatically and/or generate the PDF inside the repo and create the GitHub repo for you if you grant permission to run the `gh` command locally (I'll provide the exact commands so you can run them). Tell me which of the suggested PRs you want me to implement now.
# Health & Wellness App — Documentation

This document describes the Health & Wellness project: a full-stack web application that collects user responses to a Prakriti (Ayurvedic constitution) questionnaire, calculates a Pitta/Vata/Kapha analysis, stores the result, and provides recommendations and progress visualizations.

## Table of contents
- Project overview
- Architecture and data flow
- API endpoints (server)
- Data models
- Frontend overview
- Environment variables
- Setup & run (developer)
- Example API requests
- Security considerations
- Suggested improvements

---

## Project overview

The app has two parts:
- Backend (Node.js, Express, MongoDB): handles authentication (register/login), receives Prakriti form submissions, computes analysis and recommendations, and stores them.
- Frontend (React): provides pages for Login, Register, Prakriti form, Recommendations and Progress visualizations (charts).

Users register and login to submit the Prakriti questionnaire. The backend computes percentage scores for Pitta, Vata and Kapha and returns recommendations and a health summary which the frontend displays.

## Architecture and data flow

1. User interacts with React UI.
2. Frontend calls backend endpoints under `/api/auth` and `/api/prakriti`.
3. Backend authenticates requests using JWTs signed with `JWT_SECRET` and stored client-side in localStorage.
4. Prakriti submissions are processed and saved in MongoDB.
5. Frontend fetches saved submissions for charts and recommendations.

## API endpoints

Base URL: http://localhost:5000 (backend default)

- POST /api/auth/register
  - Body: { username, email, password }
  - Response: { token, message }

- POST /api/auth/login
  - Body: { email, password }
  - Response: { token, message }

- POST /api/prakriti/submit
  - Headers: Authorization: Bearer <token>
  - Body: { skin, bodyBuild, hair, eyes, mindset, memory, emotions, diet, sleep, energy, weather, stress }
  - Response: { message, analysis: { pitta, vata, kapha }, recommendations, healthSummary }

- GET /api/prakriti/data
  - Headers: Authorization: Bearer <token>
  - Response: [ { ...prakritiDocuments } ] (most recent first)

## Data models

- User
  - username: String, required, unique
  - email: String, required, unique
  - password: String (bcrypt-hashed)

- Prakriti
  - userId: ObjectId (ref User)
  - skin, bodyBuild, hair, eyes, mindset, memory, emotions, diet, sleep, energy, weather, stress: String
  - analysis: { pitta: Number, vata: Number, kapha: Number }
  - recommendations: [String]
  - healthSummary: String
  - createdAt: Date

## Frontend overview

- React (v18) with react-router-dom for routes.
- Axios for HTTP requests. JWT token is stored in localStorage and included in `Authorization` headers when calling protected endpoints.
- Chart.js via `react-chartjs-2` for visualizations.

Main components:
- `Login`, `Register` — authentication pages.
- `PrakritiForm` — the questionnaire and submission.
- `Recommendations` — displays saved data, recommendations and chart for each submission.
- `Progress` — trend charts across submissions.

## Environment variables

Create a `.env` file in `backend/` with the following variables (example shown in `.env.example`):

- MONGO_URI — MongoDB connection string
- JWT_SECRET — secret for signing JWTs
- PORT — optional, server port (default 5000)

## Setup & run (developer)

Prerequisites:
- Node.js (recommended 18+)
- MongoDB (Atlas or local)

Backend

1. Open a terminal and change to `backend/`.
2. Install deps: `npm install`
3. Create `.env` (see `.env.example`) and populate values.
4. Start server: `npm start` (script uses nodemon)

Frontend

1. Open a terminal and change to `frontend/`.
2. Install deps: `npm install`
3. Start dev server: `npm start` (runs on http://localhost:3000 by default)

## Example API requests (curl)

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"alice","email":"alice@example.com","password":"Secret123"}'
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"Secret123"}'
```

Submit Prakriti (replace <TOKEN>):

```bash
curl -X POST http://localhost:5000/api/prakriti/submit -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"skin":"Oily","bodyBuild":"Muscular","hair":"Oily","eyes":"Medium-sized","mindset":"Intense","memory":"Sharp","emotions":"Angry","diet":"spicy","sleep":"Moderate","energy":"High","weather":"Cool","stress":"Irritable"}'
```

## Security considerations & notes

- Never commit `.env` with secrets. Use `.env.example` to show required keys.
- JWT stored in localStorage is vulnerable to XSS theft. Prefer using HttpOnly cookies for production.
- Passwords are hashed with bcrypt; ensure the salt rounds are adequate.
- Validate and sanitize all inputs server-side; the current backend checks presence but could use a schema validator (e.g., `Joi` or `express-validator`).
- Use HTTPS in production and set appropriate CORS origin restrictions.

## Suggested improvements (prioritized)

1. Replace localStorage JWT with HttpOnly cookies to protect against XSS.
2. Add input validation using `Joi` or `express-validator` for stronger server-side checks.
3. Add rate limiting on auth endpoints (e.g., `express-rate-limit`).
4. Add automated tests for API endpoints (Jest + supertest) and a small CI workflow.
5. Add role-based access if you plan admin features.

---

If you want, I can also generate a PDF version of this documentation and add commands to create and push a GitHub repository — tell me if you want me to apply changes directly or just provide command instructions.
