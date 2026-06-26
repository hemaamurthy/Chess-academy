import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database.db import engine
from database import Base
from models import models  # noqa – ensures tables are registered
from routers import auth_router, students_router, sessions_router
from seed import seed

load_dotenv()

app = FastAPI(
    title="Chess Academy API",
    description="Backend for Chess Academy – live chess sessions platform",
    version="1.0.0",
)

# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables and seed on startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed()

# Routers
app.include_router(auth_router.router)
app.include_router(students_router.router)
app.include_router(sessions_router.router)


@app.get("/health")
def health():
    return {"status": "ok"}
