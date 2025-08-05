'use client'

import { useEffect, useRef, useState } from 'react'
import { strategies as fallback } from '@/lib/data/strategies'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = ['#10b981', '#6b7280']

export default function StrategyChartDashboard() {
  const [strategies, setStrategies] = useState(fallback)
  const exportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('strategies')
    if (saved) setStrategies(JSON.parse(saved))
  }, [])

  const chartData = strategies.map((s) => ({
    name: s.name.length > 10 ? s.name.slice(0, 10) + '...' : s.name,
    승률: s.winRate,
    우선순위: s.priority,
  }))

  const grouped = strategies.reduce(
    (acc, cur) => {
      if (cur.status === '사용 중') acc.active += 1
      else acc.inactive += 1
      return acc
    },
    { active: 0, inactive: 0 }
  )

  const statusData = [
    { name: '사용 중', value: grouped.active },
    { name: '비활성화', value: grouped.inactive },
  ]

  const handleDownloadPDF = async () => {
    if (!exportRef.current) return
    const canvas = await html2canvas(exportRef.current)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = pageWidth - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.text('LoopTrade 전략 시각화 리포트', 15, 15)
    pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight)
    pdf.save('LoopTrade_Report.pdf')
  }

  return (
    <main className="min-h-screen bg-black text-white p-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">📊 전략 시각화 대시보드</h1>
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium"
        >
          📥 PDF 다운로드
        </button>
      </div>

      <div ref={exportRef} className="space-y-10">
        <section className="bg-[#121212] border border-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">📈 전략별 승률 및 우선순위</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="승률" fill="#3b82f6" />
              <Bar dataKey="우선순위" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-[#121212] border border-gray-800 p-6 rounded-lg max-w-md">
          <h2 className="text-lg font-semibold mb-4">🥯 전략 상태 분포</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>
    </main>
  )
}
