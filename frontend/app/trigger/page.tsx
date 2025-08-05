'use client'

import { useState, useEffect, useRef } from 'react'

export default function TriggerLoopPage() {
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const sendAlert = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      const now = new Date().toLocaleTimeString()
      if (data.success && data.sent > 0) {
        setLog((prev) => [`✅ [${now}] ${data.sent}건 전송됨`, ...prev])
      } else {
        setLog((prev) => [`➖ [${now}] 조건 없음`, ...prev])
      }
    } catch (e) {
      setLog((prev) => [`❌ 오류 발생: ${e}`, ...prev])
    }
  }

  const startLoop = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(sendAlert, 10000)
      setRunning(true)
    }
  }

  const stopLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setRunning(false)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🔁 자동 트리거 루프</h1>

      <div className="space-x-4 mb-4">
        {running ? (
          <button onClick={stopLoop} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            루프 중지
          </button>
        ) : (
          <button onClick={startLoop} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            루프 시작
          </button>
        )}
        <span className="text-sm text-gray-400">{running ? '실행 중...' : '중지됨'}</span>
      </div>

      <div className="bg-gray-800 rounded p-4 h-[300px] overflow-y-scroll">
        <ul className="text-sm space-y-1">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}