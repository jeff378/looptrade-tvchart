'use client';

import Link from 'next/link';
import DailyProfitChart from '@/components/DailyProfitChart';

const dummyData = [
  { timestamp: '2025-08-01', profit: 1.2 },
  { timestamp: '2025-08-02', profit: -0.5 },
  { timestamp: '2025-08-03', profit: 0.8 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-20 py-24 space-y-20">
      <section className="flex justify-between items-start">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight mb-8">
            Faster, smarter,<br />
            stronger than your<br />
            average trading AI
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            LoopTrade는 당신의 단타 전략을 분석하고 자동화하는 AI 기반 트레이딩 파트너입니다.
          </p>

          <div className="flex gap-4">
            <Link href="/strategies">
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition">
                전략 보기
              </button>
            </Link>
            <Link href="/strategies/backtest">
              <button className="border border-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
                백테스트 실행
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 w-[420px] shadow-xl">
          <h2 className="text-lg font-semibold mb-4">📈 일일 수익률 추이</h2>
          <div style={{ width: '100%', height: 180 }}>
            <DailyProfitChart data={dummyData} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">📁 주요 기능</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { title: '설정', desc: '거래소 및 텔레그램 설정을 관리합니다.', href: '/settings' },
            { title: '텔레그램 알림', desc: '텔레그램 메시지 전송 테스트를 수행합니다.', href: '/telegram' },
            { title: '전략 성능 요약', desc: '전략들의 승률 및 우선순위를 확인합니다.', href: '/performance' },
            { title: '전략 목록', desc: '등록된 전략들의 상세 설정을 확인합니다.', href: '/strategies' },
            { title: '실시간 판단 로그', desc: 'AI 판단 결과를 실시간으로 확인합니다.', href: '/log' },
            { title: '자동 트리거 루프', desc: 'LoopTrade 트리거의 실행을 제어합니다.', href: '/trigger' },
            { title: '백테스트 실행', desc: '기간별 전략 수익률을 테스트합니다.', href: '/strategies/backtest' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-[#121212] hover:bg-gray-800 transition border border-gray-700 p-5 rounded-xl shadow-md cursor-pointer h-full">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}