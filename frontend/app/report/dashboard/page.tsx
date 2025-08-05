'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

export default function ReportDashboardPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/summary')
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl font-bold mb-6">📈 전략 성과 비교 리포트</h1>

      {data.length > 0 ? (
        <div className="bg-[#121212] p-6 border border-gray-800 rounded-lg">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#3b82f6" name="수익률" />
              <Bar dataKey="winRate" fill="#10b981" name="승률" />
              <Bar dataKey="trades" fill="#facc15" name="진입 횟수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-400">요약 데이터를 불러오는 중입니다...</p>
      )}
    </main>
  )
}
