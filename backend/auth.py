from fastapi import APIRouter
from pydantic import BaseModel
import os

login_router = APIRouter()

class LoginRequest(BaseModel):
    password: str

@login_router.post("/login")
async def login(data: LoginRequest):
    correct_password = os.getenv("ADMIN_PASSWORD", "looptrade123")
    if data.password == correct_password:
        return {"success": True}
    return {"success": False}