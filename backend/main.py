
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from backend.alert import alert_router
from backend.api.backtest.backtest_api import router as backtest_router
from backend.auth import login_router
from backend.summary import summary_router
from backend.settings import settings_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router, prefix="/api")
app.include_router(summary_router, prefix="/api")
app.include_router(settings_router, prefix="/api")
app.include_router(alert_router, prefix="/api")
app.include_router(backtest_router, prefix="/api")
