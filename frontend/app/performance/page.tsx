'use client'

import Link from 'next/link'
import { strategies } from '@/lib/data/strategies'

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">전략 성능 요약</h1>
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-sm text-gray-300">
            <th className="border border-gray-700 px-4 py-2 text-left">전략명</th>
            <th className="border border-gray-700 px-4 py-2 text-left">조건</th>
            <th className="border border-gray-700 px-4 py-2">승률</th>
            <th className="border border-gray-700 px-4 py-2">우선순위</th>
            <th className="border border-gray-700 px-4 py-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((s) => (
            <tr key={s.id} className="text-center even:bg-gray-800">
              <td className="border border-gray-700 px-4 py-2 text-left">
                <Link href={`/strategies/${s.id}`} className="text-blue-400 underline hover:text-blue-300">
                  {s.name}
                </Link>
              </td>
              <td className="border border-gray-700 px-4 py-2 text-left">{s.condition}</td>
              <td className="border border-gray-700 px-4 py-2">{s.winRate}%</td>
              <td className="border border-gray-700 px-4 py-2">{s.priority}</td>
              <td className="border border-gray-700 px-4 py-2">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
