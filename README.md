# 🚀 Smart Job Tracker  
![CI](https://github.com/RYANDONNELLY40329285/smart-jobs-tracker/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey)
![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)

A full-stack job application tracking system with built-in analytics to measure and improve job search performance.

---

## 📌 Overview

Smart Job Tracker is a **data-driven application tracking system** designed to:

- Track job applications end-to-end  
- Enforce structured workflows  
- Provide real-time analytics on job search performance  

It combines a **Node.js + Prisma backend** with a **React frontend dashboard**, turning raw job applications into actionable insights.

---

## ✨ Features

### 📂 Job Management

- Create, update, and delete job applications  
- Track application lifecycle:

APPLIED → SCREENING → INTERVIEW → OFFER

- Enforced **valid status transitions** (prevents invalid states)

---

### 🧠 Smart Role Classification

Automatically categorises roles based on title:

- Engineering  
- Data  
- Support  
- Other  

---

### 📝 Notes System

- Attach notes to each job  
- Track feedback, thoughts, and follow-ups  

---

### 🎤 Interview Tracking

- Store interview stages and dates  
- Record outcomes  

---

### 📊 Analytics Dashboard

- Total applications  
- Interviews  
- Offers  
- Response rate (%)  
- Visualised with charts (bar + doughnut)

---

## 🖥️ Frontend (React)

- Clean dashboard UI  
- Status-based job cards  
- Notes + interview tracking per job  
- Real-time analytics visualisation  

---

## 🛠️ Tech Stack

### Backend
- Node.js  
- Express  
- Prisma ORM  

### Database
- SQLite  

### Frontend
- React  
- Chart.js (analytics visualisation)

### Testing & Dev Tools
- Jest + Supertest (API testing)  
- Nodemon  
- Postman / Thunder Client  

---

## 📁 Project Structure

*backend/
├── src/
│   ├── db/
│   │   └── prisma.js
│   ├── routes/
│   │   ├── jobs.js
│   │   └── analytics.js
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma

frontend/
├── src/
│   ├── components/
│   │   ├── JobCard.js
│   │   └── AnalyticsChart.js
│   ├── api/
│   │   └── api.js
│   ├── App.js
│   └── styles.css**

---

## ⚙️ Setup & Installation

### 1. Clone repo

```bash
git clone https://github.com/RYANDONNELLY40329285/smart-jobs-tracker
cd smart-jobs-tracker

2. Backend setup
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

Server runs at:
👉 http://localhost:5000

3. Frontend setup
cd frontend
npm install
npm start

Frontend runs at:
👉 http://localhost:3000

🔌 API Examples
Create Job
POST /jobs
{
  "title": "Graduate Software Engineer",
  "company": "IBM",
  "location": "Belfast"
}
Update Status
PUT /jobs/:id
{
  "status": "INTERVIEW"
}
Add Note
POST /jobs/:id/notes
Add Interview
POST /jobs/:id/interviews
Get Analytics
GET /analytics/summary
📊 Example Output
{
  "totalApplications": 120,
  "interviews": 8,
  "offers": 2,
  "responseRate": "6.67%"
}
🧠 Key Engineering Concepts
RESTful API design with validation
Business logic enforcement (state transitions)
Relational data modelling (Jobs ↔ Notes ↔ Interviews)
Data aggregation & analytics
Full-stack integration (API + frontend)
Automated testing & CI pipeline
💡 Why I Built This

After applying to hundreds of roles, I wanted a system to:

Track applications in a structured way
Identify what was working
Improve my job search using real data