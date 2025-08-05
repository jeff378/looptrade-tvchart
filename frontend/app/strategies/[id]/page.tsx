'use client'

import { useState } from 'react'
import { strategies } from '@/lib/data/strategies'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default function StrategyDetailPage({ params }: Props) {
  const original = strategies.find((s) => s.id === params.id)
  const [edit, setEdit] = useState(false)

  const [name, setName] = useState(original?.name || '')
  const [condition, setCondition] = useState(original?.condition || '')
  const [priority, setPriority] = useState(original?.priority || 1)
  const [status, setStatus] = useState(original?.status || '사용 중')
  const [saved, setSaved] = useState(false)

  if (!original) return notFound()

  const handleSave = () => {
    setSaved(true)
    setEdit(false)
    setTimeout(() => setSaved(false), 2000)
    // 추후 API 연동 가능
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{edit ? '전략 수정' : original.name}</h1>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="border px-4 py-1 rounded text-sm hover:bg-gray-800"
          >
            ✏️ 수정
          </button>
        )}
      </div>

      {edit ? (
        <div className="space-y-4">
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
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium"
            >
              💾 저장
            </button>
            <button
              onClick={() => setEdit(false)}
              className="border border-gray-600 px-4 py-2 rounded text-sm"
            >
              취소
            </button>
          </div>
          {saved && <p className="text-green-400 mt-2 text-sm">✅ 저장되었습니다 (mock).</p>}
        </div>
      ) : (
        <div className="text-sm text-gray-300 space-y-2">
          <p><strong>조건:</strong> {original.condition}</p>
          <p><strong>우선순위:</strong> {original.priority}</p>
          <p><strong>상태:</strong> {original.status}</p>
          <p><strong>마지막 수정일:</strong> {original.lastUpdated}</p>
          <p className="pt-2">{original.description}</p>
        </div>
      )}
    </main>
  )
}
