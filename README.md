# IHWP - Indian Health and Wealth Platform (Project: Health & Wellness App)

A focused full-stack application for Ayurvedic Prakriti assessment, recommendations, and progress tracking.

Features

- User Authentication — register & login with JWT-based auth
- Prakriti Assessment — interactive form that computes Pitta/Vata/Kapha percentages
- Recommendations — personalized suggestions and health summary per submission
- Progress Tracking — charts showing trends across submissions
- Simple Admin/Management-ready data models (Users, Prakriti submissions)

Tech Stack

- Frontend: React 18, react-router-dom, axios, react-chartjs-2 (Chart.js)
- Backend: Node.js, Express, MongoDB (Mongoose), bcryptjs, jsonwebtoken

Project layout (top-level)

health-wellness-app/
├── backend/                  # Node/Express API
│   ├── config/               # DB connection helper
│   ├── models/               # Mongoose models (User, Prakriti)
│   ├── routes/               # API routes (auth, prakriti)
│   ├── server.js             # Express app entry
│   └── package.json
├── frontend/                 # React app
│   ├── public/
│   ├── src/
│   │   ├── components/       # Login, Register, PrakritiForm, Recommendations, Progress, Navbar
│   │   ├── css/              # Component styles
│   │   └── index.js, App.js
│   └── package.json
└── README.md

Quick start (developer)

1) Backend

```powershell
cd backend
npm install
# create backend/.env from .env.example with MONGO_URI and JWT_SECRET
npm start
```

2) Frontend (new terminal)

```powershell
cd frontend
npm install
npm start
```

API basics

- POST /api/auth/register — register (returns token)
- POST /api/auth/login — login (returns token)
- POST /api/prakriti/submit — submit form (protected)
- GET /api/prakriti/data — fetch user submissions (protected)

Notes & quick tips

- Keep secrets out of source control. Use `backend/.env` and add it to `.gitignore`.
- In production, move JWT to secure cookies (HttpOnly) rather than localStorage.
- To change the frontend API target, update `proxy` in `frontend/package.json` or set axios base URL.

Want me to push this project to GitHub and create a PDF of the documentation? Say "push and PDF" and I'll give exact PowerShell commands (including `gh` commands if you have GitHub CLI installed) and optionally add the generated PDF to the repo.
A Health & Wellness — Prakriti Analysis App

This repository contains a full-stack application that collects a Prakriti (Ayurvedic constitution) questionnaire, analyzes the inputs to compute Pitta/Vata/Kapha balances, stores results in MongoDB, and displays recommendations and progress charts in a React UI.

Quick start

1. Backend

```powershell
cd backend
npm install
# Create backend/.env from backend/.env.example and fill values
npm start
```

2. Frontend

```powershell
cd frontend
npm install
npm start
```

Documentation

See `DOCUMENTATION.md` for a full overview, API reference, setup instructions and recommended improvements.

Need me to push this repo to GitHub? I can provide the PowerShell commands you can run locally to create a GitHub repository and push the code (including the exact commands to run with `git` and `gh` if you have the GitHub CLI installed). Ask me and I'll show the commands.

Features

User registration and login with JWT authentication.
Prakriti analysis form with detailed table and recommendations.
Recommendations page with Pitta, Vata, Kapha percentages, health summary, and bar chart.
Progress page with dynamic insights and line chart tracking Prakriti trends.
Centered, modern UI with a consistent navbar (Logout button aligned with other links).
Opens to login page by default.

Notes

Ensure MongoDB is running before starting the backend.
The application uses Chart.js for visualizations.
All components are centered for a user-friendly design.
A MERN stack application for health and wellness, allowing users to register, login, analyze their Prakriti, and receive personalized health recommendations with charts.
Setup Instructions

Backend Setup:

Navigate to backend/.
Run npm install to install dependencies.
Create a .env file with MONGO_URI, PORT, and JWT_SECRET.
Run npm start to start the backend server.


Frontend Setup:

Navigate to frontend/.
Run npm install to install dependencies.
Run npm start to start the frontend server.


MongoDB Setup:

Ensure MongoDB is running locally or use MongoDB Atlas.
Update MONGO_URI in backend/.env accordingly.


Access the App:

Open http://localhost:3000 in your browser.
Register or login to access the Prakriti form and recommendations.



Features

User registration and login with JWT authentication.
Prakriti analysis form with detailed table and recommendations.
Recommendations page with Pitta, Vata, Kapha percentages, health summary, and bar chart.
Progress page with dynamic insights and line chart tracking Prakriti trends.
Centered, modern UI with a consistent navbar (Logout button aligned with other links).
Opens to login page by default.

Notes

Ensure MongoDB is running before starting the backend.
The application uses Chart.js for visualizations.
All components are centered for a user-friendly design.
