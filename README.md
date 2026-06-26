# ♛ Chess Academy

A full-stack web application for live chess coaching — students join live sessions via Google Meet, tutors manage students and sessions from a dedicated dashboard.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS v3     |
| Backend    | FastAPI (Python 3.10+)              |
| Database   | SQLite (dev) / PostgreSQL (prod)    |
| Auth       | JWT + bcrypt                        |
| ORM        | SQLAlchemy                          |
| Validation | Pydantic v2                         |

---

## Features

### Student
- Register & Login
- View upcoming live sessions with real-time countdown timers
- Join sessions via Google Meet
- View and manage profile
- Change password

### Tutor / Admin
- Secure login with default password change prompt
- Dashboard with stats (total students, sessions, upcoming)
- Create, edit, delete live sessions
- View and search all registered students

---

## Project Structure

```
ChessAcademy/
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, SessionCard, Modals, ProtectedRoute
│   │   ├── context/      # AuthContext (JWT state)
│   │   ├── hooks/        # useCountdown
│   │   ├── pages/        # Landing, Login, Register, Dashboards, Profile
│   │   └── services/     # api.js (axios)
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/
    ├── auth/             # JWT creation & verification, password hashing
    ├── database/         # SQLAlchemy engine & session
    ├── models/           # User, LiveSession ORM models
    ├── routers/          # auth_router, students_router, sessions_router
    ├── schemas/          # Pydantic request/response schemas
    ├── main.py           # FastAPI app, CORS, startup
    ├── seed.py           # Default tutor + sample sessions
    └── requirements.txt
```

---

## Quick Start

### 1. Clone & navigate

```bash
git clone <repo-url>
cd ChessAcademy
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env if needed (SECRET_KEY, DATABASE_URL, etc.)

# Seed database (creates default tutor + sample sessions)
python seed.py

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# VITE_API_URL=http://localhost:8000

# Start dev server
npm run dev
```

App available at: http://localhost:5173

---

## Default Accounts

### Tutor / Admin
```
Email:    xyz73502@gmail.com
Password: Chess@anu
```
> On first login, you will be prompted to change this password.

### Students
Register via the `/register` page. Students are automatically assigned the `student` role.

---

## API Reference

### Authentication
| Method | Endpoint           | Description         | Auth Required |
|--------|-------------------|---------------------|---------------|
| POST   | `/register`        | Student registration | No           |
| POST   | `/login`           | Login (any role)     | No           |
| GET    | `/me`              | Current user info    | Yes          |
| PUT    | `/change-password` | Change password      | Yes          |

### Students (Tutor only)
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/students`           | List all students     |
| GET    | `/students?search=X`  | Search by name/email  |

### Sessions (Authenticated)
| Method | Endpoint           | Description           | Role    |
|--------|-------------------|-----------------------|---------|
| GET    | `/sessions`        | List all sessions     | Any     |
| POST   | `/sessions`        | Create session        | Tutor   |
| PUT    | `/sessions/{id}`   | Edit session          | Tutor   |
| DELETE | `/sessions/{id}`   | Delete session        | Tutor   |

---

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=sqlite:///./chess_academy.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Production PostgreSQL
# DATABASE_URL=postgresql://user:password@host/chess_academy

# Default tutor seed
DEFAULT_TUTOR_EMAIL=xyz73502@gmail.com
DEFAULT_TUTOR_PASSWORD=Chess@anu
DEFAULT_TUTOR_NAME=Admin Tutor
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

---

## Production Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set `VITE_API_URL` to your backend URL in Vercel's environment settings
4. Build command: `npm run build` | Output: `dist`

### Backend → Render
1. Push `backend/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables including `DATABASE_URL` (PostgreSQL)

### Database → Supabase / Neon
1. Create a PostgreSQL database
2. Copy the connection string
3. Set `DATABASE_URL=postgresql://...` in your backend environment

---

## Security Notes

- Passwords are hashed with **bcrypt** (never stored in plaintext)
- JWTs expire after **24 hours** by default
- Role-based route protection (students cannot access tutor routes)
- CORS is configurable via `CORS_ORIGINS` env var
- SQL injection protection via SQLAlchemy ORM parameterized queries
- Input validation via Pydantic v2 schemas

---

## UI Theme

- **Colors:** Black, White, Gold (`#d4a017`), Dark Gray
- **Typography:** Inter (body) + Georgia serif (display/headings)
- **Motifs:** Chessboard patterns, chess piece icons (♟ ♛ ♔)
- **Responsive:** Mobile, tablet, and desktop friendly

---

## License

MIT
