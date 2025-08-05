import { NextRequest, NextResponse } from 'next/server'
import ccxt from 'ccxt'
import { RSI, EMA } from 'technicalindicators'

export async function POST(req: NextRequest) {
  const { strategyId, timeframe, startDate, endDate } = await req.json()

  const exchange = new ccxt.bybit({ enableRateLimit: true })
  exchange.setSandboxMode(true)

  const since = exchange.parse8601(`${startDate}T00:00:00Z`)
  const candles = await exchange.fetchOHLCV('BTC/USDT', timeframe, since)

  const closes = candles.map(c => c[4])
  const rsi = RSI.calculate({ values: closes, period: 14 })
  const ema20 = EMA.calculate({ values: closes, period: 20 })
  const ema60 = EMA.calculate({ values: closes, period: 60 })

  let trades = 0
  let success = 0

  for (let i = 60; i < closes.length - 1; i++) {
    const cond = {
      s3: () => rsi[i - 1] < 30 && rsi[i] > 30 && closes[i + 1] > closes[i],
      s1: () => ema20[i - 20] > ema60[i - 60] && closes[i] > ema20[i - 20]
    }

    if (strategyId in cond && cond[strategyId]()) {
      trades++
      success++
    }
  }

  const winRate = trades ? (success / trades) * 100 : 0
  const rr = 2.0
  const profit = trades * rr * (winRate / 100)

  return NextResponse.json({
    strategyId,
    trades,
    success,
    winRate: +winRate.toFixed(1),
    rr,
    profit: +profit.toFixed(1)
  })
}
