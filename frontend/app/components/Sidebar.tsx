'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const menu = [
  { label: '대시보드', href: '/' },
  { label: '전략 목록', href: '/strategies' },
  { label: '전략 성능 요약', href: '/performance' },
  { label: '실시간 판단 로그', href: '/log' },
  { label: '백테스트 실행', href: '/strategies/backtest' },
  { label: '설정', href: '/settings' },
  { label: '텔레그램 알림', href: '/telegram' },
  { label: '트리거 제어', href: '/trigger' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="absolute -left-14 top-6 bg-gray-700 hover:bg-gray-600 text-white rounded-l px-3 py-1 text-sm z-20"
      >
        {open ? '닫기' : '메뉴'}
      </button>

      <aside
        className={
          'h-screen w-60 bg-[#0d0d0d] border-l border-gray-800 p-6 fixed right-0 top-0 z-10 transition-transform duration-300 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <h1 className="text-lg font-bold mb-6">📊 LoopTrade</h1>
        <nav className="flex flex-col gap-3 text-sm">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                'rounded px-3 py-2 hover:bg-gray-800 transition ' +
                (pathname === item.href ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}
