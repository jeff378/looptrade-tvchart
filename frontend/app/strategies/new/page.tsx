'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewStrategyPage() {
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('')
  const [priority, setPriority] = useState(1)
  const [status, setStatus] = useState('사용 중')
  const [submitted, setSubmitted] = useState(false)

  const router = useRouter()

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      router.push('/strategies')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">➕ 전략 등록</h1>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="text-sm block mb-1">전략명</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">조건</label>
          <input
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">우선순위</label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm block mb-1">상태</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            <option value="사용 중">사용 중</option>
            <option value="비활성화">비활성화</option>
          </select>
        </div>
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-medium text-sm"
          >
            ✅ 전략 등록
          </button>
        </div>
        {submitted && <p className="text-green-400 pt-3 text-sm">✔️ 전략이 저장되었습니다 (모의 등록).</p>}
      </div>
    </main>
  )
}
