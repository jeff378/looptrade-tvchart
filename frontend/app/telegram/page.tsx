'use client'

import { useEffect, useState } from 'react'

export default function TelegramTestPage() {
  const [token, setToken] = useState('')
  const [chatId, setChatId] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/settings`)
      .then(res => res.json())
      .then(data => {
        setToken(data.telegramToken || '')
      })
  }, [])

  const sendTestMessage = async () => {
    if (!token || !chatId) {
      setResult('❗ 토큰과 Chat ID를 모두 입력해주세요.')
      return
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message || '[LoopTrade] 텔레그램 연동 테스트 메시지입니다.'
      })
    })

    const json = await res.json()
    if (json.ok) {
      setResult('✅ 메시지 전송 성공!')
    } else {
      setResult('❌ 전송 실패: ' + json.description)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📬 텔레그램 알림 테스트</h1>
      <div className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">텔레그램 Chat ID</label>
          <input
            type="text"
            value={chatId}
            onChange={e => setChatId(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">보낼 메시지 (선택)</label>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="[LoopTrade] 텔레그램 연동 테스트 메시지입니다."
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          onClick={sendTestMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          테스트 메시지 보내기
        </button>
        {result && <p className="text-yellow-300 text-sm mt-2">{result}</p>}
      </div>
    </div>
  )
}