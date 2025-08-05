'use client'

import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [telegramToken, setTelegramToken] = useState('')
  const [chatId, setChatId] = useState('')
  const [bybitKey, setBybitKey] = useState('')
  const [bybitSecret, setBybitSecret] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/settings`)
      .then(res => res.json())
      .then(data => {
        setTelegramToken(data.telegramToken || '')
        setChatId(data.chatId || '')
        setBybitKey(data.bybitKey || '')
        setBybitSecret(data.bybitSecret || '')
      })
  }, [])

  const handleSave = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramToken, chatId, bybitKey, bybitSecret })
    })
    const result = await res.json()
    if (result.success) {
      setMessage('✅ 설정이 저장되었습니다')
    } else {
      setMessage('⚠️ 저장 실패')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">⚙️ 설정</h1>
      <div className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm mb-1">텔레그램 봇 토큰</label>
          <input
            type="text"
            value={telegramToken}
            onChange={e => setTelegramToken(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
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
          <label className="block text-sm mb-1">Bybit API Key</label>
          <input
            type="text"
            value={bybitKey}
            onChange={e => setBybitKey(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Bybit API Secret</label>
          <input
            type="password"
            value={bybitSecret}
            onChange={e => setBybitSecret(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          저장하기
        </button>
        {message && <p className="mt-2 text-sm text-yellow-300">{message}</p>}
      </div>
    </div>
  )
}