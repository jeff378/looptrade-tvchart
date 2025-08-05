
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from backend.backtest_runner import run_backtest  # ✅ 이름 수정

router = APIRouter()

class BacktestRequest(BaseModel):
    strategy: str
    from_date: str
    to_date: str
    timeframe: str
    source: str

@router.post("/backtest")
async def backtest_handler(req: BacktestRequest):
    from_dt = datetime.strptime(req.from_date, "%Y-%m-%d")
    to_dt = datetime.strptime(req.to_date, "%Y-%m-%d")

    result = run_backtest(
        strategy_name=req.strategy,
        from_date=req.from_date,
        to_date=req.to_date,
        timeframe=req.timeframe,
        source=req.source
    )
    return result
