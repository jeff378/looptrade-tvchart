'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/summary`)
      .then(res => res.json())
      .then(data => setSummary(data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 대시보드</h1>

      {!summary ? (
        <p>로딩 중...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">오늘의 수익</h2>
            <p className="text-2xl">{summary.todayProfit} USDT</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">포지션 현황</h2>
            {summary.position ? (
              <ul>
                <li>진입가: {summary.position.entryPrice}</li>
                <li>포지션: {summary.position.side}</li>
                <li>진입 시간: {summary.position.entryTime}</li>
              </ul>
            ) : (
              <p>포지션 없음</p>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">전략 요약</h2>
            <ul className="space-y-2">
              {summary.strategies.map((s: any, i: number) => (
                <li key={i}>
                  📌 {s.strategy} — <span className="text-yellow-300">{s.status}</span> ({s.profit}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}