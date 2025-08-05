'use client'

import { useState } from 'react'

export default function CSVBacktestPage() {
  const [strategy, setStrategy] = useState('')
  const [csvPath, setCsvPath] = useState('')
  const [timeframe, setTimeframe] = useState('1h')
  const [result, setResult] = useState(null)

  const handleRun = async () => {
    const res = await fetch('/api/csv', {
      method: 'POST',
      body: JSON.stringify({ strategy, csvPath, timeframe }),
    })
    const json = await res.json()
    setResult(json)
  }

  return (
    <main className="p-10 bg-black text-white min-h-screen">
      <h1 className="text-xl font-bold mb-6">🧪 전략 백테스트 실행</h1>

      <div className="space-y-4 max-w-md">
        <input
          className="w-full p-2 rounded text-black"
          value={strategy}
          placeholder="전략명"
          onChange={(e) => setStrategy(e.target.value)}
        />
        <input
          className="w-full p-2 rounded text-black"
          value={csvPath}
          placeholder="CSV 경로"
          onChange={(e) => setCsvPath(e.target.value)}
        />
        <input
          className="w-24 p-2 rounded text-black"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        />
        <button
          onClick={handleRun}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          백테스트 실행
        </button>
      </div>

      {result && (
        <div className="mt-10 space-y-2">
          <h2 className="text-lg font-bold">📊 결과</h2>
          <p>총 진입: {result.trades}</p>
          <p>승률: {result.winRate}%</p>
          <p>손익비(RR): {result.rr}</p>
          <p>수익률: {result.profit}%</p>
        </div>
      )}
    </main>
  )
}
