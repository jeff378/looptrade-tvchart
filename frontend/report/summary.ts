
import fs from 'fs'
import path from 'path'

export function getBacktestSummary() {
  const dir = path.resolve(process.cwd(), 'data/backtest_results')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))

  const all = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const parsed = JSON.parse(raw)
    return {
      id: parsed.strategy_id,
      name: parsed.strategy_name,
      winRate: parsed.result.winRate,
      profit: parsed.result.profit,
      trades: parsed.result.trades,
    }
  })

  const sorted = all.sort((a, b) => b.profit - a.profit)
  return sorted
}
