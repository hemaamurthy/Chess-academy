from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database.db import get_db
from models.models import LiveSession, User
from schemas.schemas import SessionCreate, SessionUpdate, SessionOut
from auth.auth import get_current_user, require_tutor

router = APIRouter(prefix="/sessions", tags=["Sessions"])


@router.get("", response_model=List[SessionOut])
def get_sessions(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(LiveSession).order_by(LiveSession.date, LiveSession.time).all()


@router.post("", response_model=SessionOut, status_code=201)
def create_session(
    data: SessionCreate,
    db: Session = Depends(get_db),
    tutor: User = Depends(require_tutor)
):
    session = LiveSession(**data.model_dump(), created_by=tutor.id)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.put("/{session_id}", response_model=SessionOut)
def update_session(
    session_id: int,
    data: SessionUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_tutor)
):
    session = db.query(LiveSession).filter(LiveSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    for key, value in data.model_dump(exclude_none=True).items():
        setattr(session, key, value)

    db.commit()
    db.refresh(session)
    return session


@router.delete("/{session_id}", status_code=204)
def delete_session(
    session_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_tutor)
):
    session = db.query(LiveSession).filter(LiveSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    db.delete(session)
    db.commit()
