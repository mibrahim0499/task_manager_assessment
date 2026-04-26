# 📝 Mini Task Manager – Full Stack Assessment

A lightweight full-stack task management application built as part of a technical assessment.  
It demonstrates backend API design, database integration, validation, authentication (bonus), and a simple frontend interface.

---

## ⚠️ Important Note

Only the README documentation was assisted using AI for clarity and formatting.  
All implementation code was written manually to demonstrate understanding of full-stack development.

---

## 🚀 Tech Stack

### Backend
- NestJS
- TypeORM
- SQLite
- REST API
- Class Validator (DTO validation)

### Frontend
- React (Vite)
- Axios
- Vanilla CSS

---

## 📁 Project Structure

### Backend
```
backend/
src/
  tasks/
    dto/
    entities/
    enums/
    tasks.controller.ts
    tasks.service.ts
  auth/
  database/
  main.ts
```

### Frontend
```
frontend/
src/
  api/
  components/
  pages/
```

---

## ⚙️ Features

### ✅ Backend Features
- Create a task
- Get all tasks
- Get task by ID
- Update task
- Delete task
- Filter tasks by:
  - status (todo / in-progress / done)
  - priority (low / medium / high)

---

## 📌 Task Model

Each task contains:
- id (auto-generated)
- title
- description
- status
- priority
- createdAt

---

## 🔐 Bonus Feature – API Key Authentication

A simple API key-based authentication system using NestJS Guards.

All requests require:
`x-api-key: task-manager-123`

If missing or invalid:
`401 Unauthorized`

---

## 🗄️ Database
- SQLite is used for simplicity
- Database file: `tasks.db`
- Auto schema synchronization enabled (development only)

---

## ▶️ Setup & Installation

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
Backend runs at: `http://localhost:3000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🧪 Testing

Unit tests are included for the core task management logic (Controller and Service).

### Running Backend Tests
```bash
cd backend
npm test
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /tasks | Get all tasks (with filters) |
| GET | /tasks/:id | Get single task |
| POST | /tasks | Create task |
| PATCH | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

### 🔍 Filtering
You can filter tasks using query params:
`GET /tasks?status=todo&priority=high`
