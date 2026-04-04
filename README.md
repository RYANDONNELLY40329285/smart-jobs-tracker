#  Smart Job Tracker  
![CI](https://github.com/RYANDONNELLY40329285/smart-jobs-tracker/actions/workflows/ci.yml/badge.svg)  
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)  
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)  
![SQLite](https://img.shields.io/badge/SQLite-Database-lightgrey)  
![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)

A full-stack job application tracking system with built-in analytics to measure and improve job search performance.

---

## Overview

Smart Job Tracker is a **data-driven application tracking system** designed to:

- Track job applications end-to-end  
- Enforce structured workflows  
- Provide real-time analytics on job search performance  

It combines a **Node.js + Prisma backend** with a **React frontend dashboard**, turning raw job applications into actionable insights.

---

## Features

###  Job Management

- Create, update, and delete job applications  
- Track application lifecycle:

```
APPLIED → SCREENING → INTERVIEW → OFFER 
```

- Enforced **valid status transitions**

---

###  Smart Role Classification

- Engineering  
- Data  
- Support  
- Other  

---

###  Notes System

- Add notes to each job  

---

### Interview Tracking

- Store interview stages   

---

###  Analytics Dashboard

- Total applications  
- Interviews  
- Offers  
- Response rate (%)  
- Chart visualisation  

---

##  Tech Stack

Backend: Node.js, Express, Prisma  
Database: SQLite  
Frontend: React, Chart.js  
Testing: Jest, Supertest  

---

## 📁 Project Structure

```
backend/
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
│   └── styles.css
```

---

##  Setup & Installation

### Clone repo

```
git clone https://github.com/RYANDONNELLY40329285/smart-jobs-tracker
cd smart-jobs-tracker
```

### Backend

```
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

Server: http://localhost:5000

### Frontend

```
cd frontend
npm install
npm start
```

Frontend: http://localhost:3000

---

##  API Examples

### Create Job

POST /jobs

```
{
  "title": "Graduate Software Engineer",
  "company": "IBM",
  "location": "Belfast"
}
```

---

### Update Status

PUT /jobs/:id

```
{
  "status": "INTERVIEW"
}
```

---

### Get Analytics

GET /analytics/summary

---

## Example Output

```
{
  "totalApplications": 120,
  "interviews": 8,
  "offers": 2,
  "responseRate": "6.67%"
}
```

---

##  Why I Built This

After applying to hundreds of roles, I wanted a system to:

- Track applications properly  
- Analyse results  
- Improve my job search using data   - 
