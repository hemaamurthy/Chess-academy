import secrets
import resend
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from database.db import get_db
from models.models import User
from schemas.schemas import UserRegister, UserLogin, UserOut, Token, ChangePassword
from auth.auth import hash_password, verify_password, create_access_token, get_current_user
load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

router = APIRouter(tags=["Auth"])


@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already registered. Please login."
        )

    user = User(
        full_name=data.full_name,
        email=data.email,
        age=data.age,
        password_hash=hash_password(data.password),
        role="student",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email or Password"
        )

    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/change-password")
def change_password(
    data: ChangePassword,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not verify_password(data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    current_user.password_hash = hash_password(data.new_password)
    current_user.must_change_password = 0
    db.commit()
    return {"message": "Password changed successfully"}

 
@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"message": "If the email exists, a reset link has been sent"}

    token = secrets.token_urlsafe(32)

    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(minutes=15)

    db.commit()

    reset_link = f"https://chess-academy-tau.vercel.app/reset-password?token={token}"

    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": [user.email],
        "subject": "Chess Academy Password Reset",
        "html": f"""
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="{reset_link}">{reset_link}</a>
        """
    })

    return {"message": "Password reset email sent"}

@router.post("/reset-password")
def reset_password(
    token: str,
    new_password: str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(User.reset_token == token).first()

    if not user:
        return {"message": "Invalid token"}
    if user.reset_token_expiry < datetime.utcnow():
       return {"message": "Token expired"}

    user.password_hash = hash_password(new_password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return {"message": "Password reset successful"}