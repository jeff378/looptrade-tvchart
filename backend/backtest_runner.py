
from datetime import datetime
from .summary import load_summary_data
from .strategies.trendline import detect_breakout_entry
from .data_fetcher.binance import get_binance_candles

def run_backtest(strategy_name, from_date, to_date, timeframe, source="binance"):
    if source == "binance":
        data = get_binance_candles(symbol="BTCUSDT", interval=timeframe.replace("m", ""), limit=1000)
        from_dt = datetime.strptime(from_date, "%Y-%m-%d")
        to_dt = datetime.strptime(to_date, "%Y-%m-%d")
        data = [
            d for d in data
            if from_dt <= datetime.strptime(d["timestamp"], "%Y-%m-%d") <= to_dt
        ]
    else:
        data = load_summary_data()
        from_dt = datetime.strptime(from_date, "%Y-%m-%d")
        to_dt = datetime.strptime(to_date, "%Y-%m-%d")
        data = [
            d for d in data
            if from_dt <= datetime.strptime(d["timestamp"], "%Y-%m-%d") <= to_dt
            and d.get("timeframe") == timeframe
        ]

    if strategy_name == "trendline":
        entries = detect_breakout_entry(data)
        for e in entries:
            if "profitRate" not in e and "profit" in e:
                e["profitRate"] = e["profit"]

        return {
            "entries": entries,
            "wins": sum(1 for e in entries if e["win"]),
            "losses": sum(1 for e in entries if not e["win"]),
            "winrate": round(sum(1 for e in entries if e["win"]) / len(entries) * 100, 2) if entries else 0,
            "rr": round(sum(e["profit"] for e in entries) / max(sum(1 for e in entries if e["win"]), 1), 2) if entries else 0,
            "profit": round(sum(e["profit"] for e in entries) / len(entries), 2) if entries else 0,
            "candles": data
        }

    return {"error": "Invalid strategy"}
