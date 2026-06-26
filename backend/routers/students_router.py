from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database.db import get_db
from models.models import User
from schemas.schemas import UserOut
from auth.auth import require_tutor

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("", response_model=List[UserOut])
def get_students(
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _: User = Depends(require_tutor)
):
    query = db.query(User).filter(User.role == "student")
    if search:
        like = f"%{search}%"
        query = query.filter(
            (User.full_name.ilike(like)) | (User.email.ilike(like))
        )
    return query.order_by(User.created_at.desc()).all()
