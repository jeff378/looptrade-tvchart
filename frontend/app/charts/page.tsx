'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface StrategyItem {
  name: string
  winRate: number
  priority: number
  enabled: boolean
}

export default function ChartPage() {
  const [data, setData] = useState<StrategyItem[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/strategies`)
      .then(res => res.json())
      .then(strategies => {
        const chartData = strategies.map((s: any) => ({
          name: s.name,
          winRate: s.winRate,
          priority: s.priority,
          enabled: s.enabled,
        }))
        setData(chartData)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 전략 승률 / 우선순위 차트</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="winRate" fill="#8884d8" name="승률(%)" />
          <Bar dataKey="priority" fill="#82ca9d" name="우선순위" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}