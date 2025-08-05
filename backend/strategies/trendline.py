
def detect_breakout_entry(data):
    entries = []
    print(f"[DEBUG] 캔들 개수: {len(data)}")
    if len(data) < 21:
        print("[DEBUG] 데이터 부족으로 탐지 중단")
        return entries

    for i in range(20, len(data) - 1):
        try:
            candle = data[i]
            next_candle = data[i + 1]

            recent_highs = [float(c.get("high") or c.get("h")) for c in data[i-20:i]]
            highest_recent = max(recent_highs)

            current_high = float(candle.get("high") or candle.get("h"))
            current_close = float(candle.get("close") or candle.get("c"))
            next_close = float(next_candle.get("close") or next_candle.get("c"))

            if current_high > highest_recent:
                entry = {
                    "time": candle.get("timestamp") or candle.get("time"),
                    "price": current_close,
                    "type": "long",
                    "profitRate": (next_close - current_close) / current_close * 100,
                    "profit": (next_close - current_close) / current_close * 100,
                    "win": next_close > current_close
                }
                entries.append(entry)

        except Exception as e:
            print(f"[DEBUG] entry 생성 실패 at index {i}: {e}")
            continue

    print(f"[DEBUG] 생성된 진입 수: {len(entries)}")
    return entries
