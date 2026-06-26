from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime


# ── Auth Schemas ────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    age: int
    password: str
    confirm_password: str

    @field_validator("age")
    @classmethod
    def age_must_be_positive(cls, v):
        if v < 5 or v > 100:
            raise ValueError("Age must be between 5 and 100")
        return v

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "new_password" in info.data and v != info.data["new_password"]:
            raise ValueError("Passwords do not match")
        return v


# ── User Response Schemas ────────────────────────────────────────────────────

class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    age: int
    role: str
    created_at: datetime
    must_change_password: int = 0

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ── Session Schemas ──────────────────────────────────────────────────────────

class SessionCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: str   # YYYY-MM-DD
    time: str   # HH:MM
    google_meet_link: str

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Title cannot be empty")
        return v

    @field_validator("google_meet_link")
    @classmethod
    def valid_meet_link(cls, v):
        if not v.startswith("http"):
            raise ValueError("Google Meet link must be a valid URL")
        return v


class SessionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    google_meet_link: Optional[str] = None


class SessionOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    date: str
    time: str
    google_meet_link: str
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
