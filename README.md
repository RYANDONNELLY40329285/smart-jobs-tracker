#  Smart Job Tracker

A full-stack job application tracking system with analytics, built to optimise and measure job search performance.

---

##  Overview

Smart Job Tracker is a backend-focused system designed to track job applications, monitor progress, and provide insights into application success rates.

It supports full job lifecycle tracking, interview management, and analytics to help users understand and improve their job search strategy.

---

##  Features

###  Job Management

* Create, update, and delete job applications
* Track status:
  **Applied → Screening → Interview → Offer → Rejected**
* Enforced status transitions (prevents invalid progression)

###  Smart Classification

* Automatically categorises roles:

  * Engineering
  * Data
  * Support
  * Other

### Notes System

* Add notes to each job
* Track thoughts, feedback, and application details

### Interview Tracking

* Store interview stages and dates
* Record outcomes

###  Analytics

* Total applications
* Interview count
* Offer count
* Response rate (%)
* Weekly application trends

---

## Tech Stack

* **Backend:** Node.js, Express
* **Database:** SQLite (via Prisma ORM)
* **ORM:** Prisma
* **Testing Tools:** Postman / Thunder Client / curl
* **Dev Tools:** Nodemon

---

##  Project Structure

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
└── package.json
```

---

##  Setup & Installation

### 1. Clone repo

```
git clone <your-repo-url>
cd smart-job-tracker/backend
```

### 2. Install dependencies

```
npm install
```

### 3. Setup database

```
npx prisma migrate dev --name init
```

### 4. Run server

```
npm run dev
```

Server runs at:
 http://localhost:5000

---

## API Examples

### Create Job

```
POST /jobs
```

```json
{
  "title": "Graduate Software Engineer",
  "company": "IBM",
  "location": "Belfast"
}
```

---

### Update Status

```
PUT /jobs/:id
```

```json
{
  "status": "INTERVIEW"
}
```

---

### Get Analytics

```
GET /analytics/summary
GET /analytics/weekly
```

---

### Add Note

```
POST /jobs/:id/notes
```

---

### Add Interview

```
POST /jobs/:id/interviews
```

---

## Example Output

```json
{
  "totalApplications": 120,
  "interviews": 8,
  "offers": 2,
  "responseRate": "6.67%"
}
```

---

## Why I Built This

After applying to hundreds of roles, I wanted a system to:

* Track applications effectively
* Analyse success rates
* Improve my job search strategy using data

---

##  Key Learnings

* Designing RESTful APIs with proper validation
* Working with relational data using Prisma
* Implementing business logic (status transitions)
* Building analytics from real-world data
* Structuring scalable backend applications

---

