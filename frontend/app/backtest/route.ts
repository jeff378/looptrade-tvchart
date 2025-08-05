import { NextRequest, NextResponse } from 'next/server'
import ccxt from 'ccxt'
import {
  RSI,
  EMA,
  BollingerBands,
  MACD,
} from 'technicalindicators'

type StrategyFunction = (params: {
  closes: number[]
  rsi: number[]
  macd: any[]
  bb: any[]
  ema: { e20: number[]; e60: number[]; e120: number[]; e200: number[] }
  i: number
}) => boolean

const strategies: Record<string, StrategyFunction> = {
  s1: ({ ema, i }) => (
    ema.e20[i - 20] > ema.e60[i - 60] &&
    ema.e60[i - 60] > ema.e120[i - 120] &&
    ema.e120[i - 120] > ema.e200[i - 200]
  ),

  s3: ({ rsi, closes, i }) => (
    rsi[i - 15] < 30 && rsi[i - 14] > 30 && closes[i + 1] > closes[i]
  ),

  s4: ({ bb, i }) => (
    bb[i - 20] && (bb[i - 20].upper - bb[i - 20].lower) / bb[i - 20].middle < 0.04
  ),

  s8: ({ macd, i }) => (
    macd[i - 1]?.MACD < macd[i - 1]?.signal && macd[i]?.MACD > macd[i]?.signal
  ),
}

export async function POST(req: NextRequest) {
  const { strategyId, timeframe, startDate } = await req.json()
  const exchange = new ccxt.bybit({ enableRateLimit: true })
  exchange.setSandboxMode(true)

  const since = exchange.parse8601(`${startDate}T00:00:00Z`)
  const candles = await exchange.fetchOHLCV('BTC/USDT', timeframe, since)

  const closes = candles.map(c => c[4])
  const rsi = RSI.calculate({ values: closes, period: 14 })
  const bb = BollingerBands.calculate({ values: closes, period: 20, stdDev: 2 })
  const macd = MACD.calculate({ values: closes, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 })

  const ema20 = EMA.calculate({ values: closes, period: 20 })
  const ema60 = EMA.calculate({ values: closes, period: 60 })
  const ema120 = EMA.calculate({ values: closes, period: 120 })
  const ema200 = EMA.calculate({ values: closes, period: 200 })

  let trades = 0
  let success = 0

  const fn = strategies[strategyId]
  if (!fn) {
    return NextResponse.json({ error: '전략이 존재하지 않습니다' }, { status: 400 })
  }

  for (let i = 200; i < closes.length - 1; i++) {
    const shouldEnter = fn({
      closes,
      rsi,
      macd,
      bb,
      ema: { e20: ema20, e60: ema60, e120: ema120, e200: ema200 },
      i,
    })

    if (shouldEnter) {
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
    profit: +profit.toFixed(1),
  })
}
