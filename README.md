# SkillSync ATS - Full-Stack Application

SkillSync ATS is a modern Applicant Tracking System with a decoupled Frontend (`client/`) and Backend API (`server/`).

---

## 📁 Project Architecture

```
ATS/
├── client/                 # React + Vite Frontend Application
│   ├── src/                # UI Components, Pages & API Adapters
│   ├── public/             # Static Assets
│   ├── index.html          # HTML Entrypoint
│   ├── vite.config.js      # Vite Configuration
│   ├── package.json        # Frontend Dependencies & Build Scripts
│   └── .env.example        # Frontend Environment Template
│
├── server/                 # Node.js + Express Backend API
│   ├── routes/             # REST API Routes
│   ├── db/                 # Drizzle ORM & PostgreSQL Schema
│   ├── index.js            # Express Entrypoint & Server Setup
│   ├── package.json        # Backend Dependencies
│   └── .env.example        # Backend Environment Template
│
├── package.json            # Root Workspace & Concurrently Runner
└── README.md               # Project Documentation & Deployment Guide
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies
Run from the root directory to install dependencies across both `client` and `server`:
```bash
npm run install:all
```
*(or run `npm install` at root if using npm workspaces)*

### 2. Environment Setup

#### Frontend (`client/.env`)
Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

#### Backend (`server/.env`)
Create `server/.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:3000
DATABASE_URL=postgres://user:password@localhost:5432/skillsync_ats
```

### 3. Run Development Servers
To start both Frontend and Backend concurrently:
```bash
npm run dev
```

Or run individually:
- **Frontend only**: `npm run dev:client` (Runs on `http://localhost:3000`)
- **Backend only**: `npm run dev:server` (Runs on `http://localhost:5000`)

---

## 🌐 Deployment Instructions

Because the project is separated into `client/` and `server/`, you can deploy them independently to specialized hosting services.

### 1. Deploying Frontend (`client`) to Vercel / Netlify / Cloudflare Pages

1. **Root Directory Setting**: Set the Root Directory / Subdirectory in your hosting service to **`client`**.
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: URL of your deployed server backend (e.g. `https://skillsync-ats-server.onrender.com`).

### 2. Deploying Backend (`server`) to Render / Railway / Fly.io

1. **Root Directory / Subdirectory**: Set to **`server`**.
2. **Build Command**: `npm install`
3. **Start Command**: `npm start` (or `node index.js`)
4. **Environment Variables**:
   - `PORT`: Server port (automatically assigned on Render/Railway).
   - `CLIENT_URL`: URL of your deployed frontend (e.g. `https://skillsync-ats.vercel.app`) for CORS origin validation.
   - `DATABASE_URL`: Production PostgreSQL connection URI (e.g. Neon, Supabase, Render Postgres).

---

## 📦 Database Migrations (Backend)

Run Drizzle database schema pushes or migrations from the `server/` directory:
```bash
cd server
npm run db:push
```
