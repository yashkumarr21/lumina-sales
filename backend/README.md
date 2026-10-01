# Lumina Enterprise Sales Intelligence - Express Backend

A high-performance Node.js and Express RESTful API built to power the Lumina Glassmorphism Enterprise Sales UI dashboard.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
An `.env` file is included with sensible defaults:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. Start the Server
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```

Server will run at `http://localhost:5000`.

---

## 📡 API Endpoints

### 🩺 System & Overview
- `GET /api/health` - Server health check, uptime, and status.
- `GET /api/overview` - Aggregated executive overview metrics (revenue, pipeline gauge, win rate, recent deals).

### 📈 Deal Activities
- `GET /api/activities` - Fetch deal activities list.
  - Query parameter: `?type=deal|call|lost|lead`
- `POST /api/activities` - Create a new deal or sales activity.
  - Body:
    ```json
    {
      "title": "TechNova Expansion Deal",
      "amount": "$180,000",
      "type": "deal",
      "subtitle": "Moved to Negotiation ($180k ARR)"
    }
    ```
- `DELETE /api/activities/:id` - Delete an activity record.

### 🎯 Autonomous AI Leads
- `GET /api/leads` - List enriched enterprise leads scored by AI.
- `POST /api/leads` - Add and qualify a new sales lead.
  - Body:
    ```json
    {
      "company": "Quantum Dynamics",
      "contact": "Sophia Lin (VP Eng)",
      "val": "$180k",
      "employees": "150-300",
      "location": "Seattle, WA"
    }
    ```

### 💼 Deal Pipelines
- `GET /api/deals` - Pipeline summary grouped by stage (`discovery`, `proposal`, `negotiation`).
- `POST /api/deals` - Add a deal into a pipeline stage.
  - Body:
    ```json
    {
      "stage": "discovery",
      "name": "Cloud Data Mesh",
      "company": "Apex Corp",
      "amount": "$250,000",
      "probability": 50
    }
    ```

### 📊 Revenue Analytics
- `GET /api/analytics` - Revenue predictive telemetry, monthly trends, quota attainment, and average deal cycles.

### 📅 Executive Briefing Demo Bookings
- `POST /api/demo-bookings` - Register a scheduled briefing request from the UI.
  - Body:
    ```json
    {
      "fullName": "Sarah Jenkins",
      "workEmail": "sarah@apex.com",
      "company": "Apex Dynamics",
      "teamSize": "10-50",
      "interest": "Autonomous Pipeline Automation"
    }
    ```
- `GET /api/demo-bookings` - Retrieve briefing booking submissions.

### 💰 Pricing & FAQs
- `GET /api/plans` - Retrieve Starter, Professional, and Enterprise pricing tiers.
- `GET /api/faqs` - Retrieve platform FAQs.

### ⚡ Core Capabilities
- `GET /api/capabilities` - Retrieve modular intelligence architecture details and technical specifications.

### 🧠 AI Deal Telemetry & Win Probability
- `POST /api/ai/analyze-deal` - Real-time deal risk, sentiment, and AI closing recommendations.
  - Body:
    ```json
    {
      "dealName": "TechNova Enterprise",
      "company": "TechNova Inc",
      "amount": "$180,000"
    }
    ```

---

## 🛠️ Project Structure

```
backend/
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── server.js              # Server bootstrapper & listener
    ├── app.js                 # Express application & middleware setup
    ├── config/
    │   └── index.js           # Environment & runtime configuration
    ├── data/
    │   └── store.js           # In-memory database with realistic seed data
    ├── middleware/
    │   ├── errorHandler.js    # 404 & centralized error handling
    │   └── requestLogger.js   # Morgan logging
    ├── controllers/
    │   ├── activityController.js
    │   ├── leadController.js
    │   ├── dealController.js
    │   ├── analyticsController.js
    │   ├── demoBookingController.js
    │   ├── planController.js
    │   ├── capabilityController.js
    │   └── aiController.js
    └── routes/
        ├── index.js           # Master API router
        ├── activities.js
        ├── leads.js
        ├── deals.js
        ├── analytics.js
        ├── demoBookings.js
        ├── plans.js
        ├── capabilities.js
        └── ai.js
```
