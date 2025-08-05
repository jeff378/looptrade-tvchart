
import requests
from datetime import datetime

def get_binance_candles(symbol="BTCUSDT", interval="1h", limit=1000):
    url = f"https://api.binance.com/api/v3/klines?symbol={symbol}&interval={interval}&limit={limit}"
    response = requests.get(url)
    data = response.json()

    candles = []
    for item in data:
        candles.append({
            "timestamp": datetime.utcfromtimestamp(item[0] / 1000).strftime("%Y-%m-%d"),
            "open": float(item[1]),
            "high": float(item[2]),
            "low": float(item[3]),
            "close": float(item[4]),
            "volume": float(item[5])
        })
    return candles
