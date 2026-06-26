"""
Seed script: creates the default tutor account and sample sessions.
Run once: python seed.py
"""
import os
import sys
from datetime import date, timedelta
from dotenv import load_dotenv

load_dotenv()
sys.path.insert(0, os.path.dirname(__file__))

from database.db import SessionLocal, engine
from database import Base
from models.models import User, LiveSession
from auth.auth import hash_password

DEFAULT_EMAIL = os.getenv("DEFAULT_TUTOR_EMAIL", "xyz73502@gmail.com")
DEFAULT_PASSWORD = os.getenv("DEFAULT_TUTOR_PASSWORD", "Chess@anu")
DEFAULT_NAME = os.getenv("DEFAULT_TUTOR_NAME", "Admin Tutor")


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Create default tutor
        existing = db.query(User).filter(User.email == DEFAULT_EMAIL).first()
        if not existing:
            tutor = User(
                full_name=DEFAULT_NAME,
                email=DEFAULT_EMAIL,
                age=30,
                password_hash=hash_password(DEFAULT_PASSWORD),
                role="tutor",
                must_change_password=1,
            )
            db.add(tutor)
            db.commit()
            db.refresh(tutor)
            print(f"✅ Default tutor created: {DEFAULT_EMAIL}")

            # Sample sessions
            tutor_id = tutor.id
            today = date.today()
            sample_sessions = [
                LiveSession(
                    title="Opening Principles – Beginner",
                    description="Learn the fundamental rules for opening a chess game with confidence.",
                    date=str(today + timedelta(days=2)),
                    time="10:00",
                    google_meet_link="https://meet.google.com/abc-defg-hij",
                    created_by=tutor_id,
                ),
                LiveSession(
                    title="Tactics: Forks & Pins",
                    description="Master the most common tactical motifs used in intermediate play.",
                    date=str(today + timedelta(days=5)),
                    time="15:00",
                    google_meet_link="https://meet.google.com/xyz-uvwx-yz",
                    created_by=tutor_id,
                ),
                LiveSession(
                    title="Endgame Essentials",
                    description="King and pawn endings, rook endgames, and converting advantages.",
                    date=str(today + timedelta(days=10)),
                    time="18:00",
                    google_meet_link="https://meet.google.com/end-game-xyz",
                    created_by=tutor_id,
                ),
            ]
            db.add_all(sample_sessions)
            db.commit()
            print("✅ Sample sessions created")
        else:
            print(f"ℹ️  Default tutor already exists: {DEFAULT_EMAIL}")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
