
'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { downloadCSV } from '@/utils/download';
import LightweightChart from '@/components/LightweightChart';

interface ResultEntry {
  label: string;
  data: { name: string; value: number; fill?: string }[];
  stats: { entries: number; rr: number; winrate: number; profit: number };
  entries?: {
    time: number;
    direction: 'long' | 'short';
    strategy: string;
    profit: number;
  }[];
  candles?: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

export default function Page() {
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [strategy, setStrategy] = useState('trendline');
  const [timeframe, setTimeframe] = useState('15m');

  const handleBacktest = async () => {
    const label = `${strategy} (${timeframe})`;

    try {
      const response = await fetch('http://localhost:8000/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy,
          from_date: fromDate,
          to_date: toDate,
          timeframe,
          source: 'binance' // ✅ 수정됨
        })
      });

      const result = await response.json();

      const entry: ResultEntry = {
        label,
        data: [
          { name: `${label} 수익률`, value: result.profit, fill: '#10b981' },
          { name: `${label} 승률`, value: result.winrate, fill: '#3b82f6' },
        ],
        stats: {
          entries: result.entries.length,
          rr: result.rr,
          winrate: result.winrate,
          profit: result.profit
        },
        entries: result.entries,
        candles: result.candles
      };

      setResults((prev) => [...prev, entry]);
    } catch (error) {
      alert("백엔드 API 요청 실패: " + error);
    }
  };

  const flatChartData = results.flatMap(r => r.data);
  const allEntries = results.flatMap(r => r.entries || []);
  const allCandles = results.flatMap(r => r.candles || []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'black', color: 'white', padding: '2rem' }}>
      {/* 왼쪽 폼 영역 */}
      <div style={{ width: '340px', backgroundColor: '#1f1f1f', padding: '2rem', borderRadius: '10px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>📊 전략 백테스트 실행</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ color: 'white' }}>
            전략 선택:
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)} style={{ width: '100%', padding: '0.5rem', color: 'black', backgroundColor: 'white' }}>
              <option value="trendline">추세선 돌파</option>
              <option value="strategy1">랜덤 전략 1</option>
              <option value="strategy2">랜덤 전략 2</option>
              <option value="strategy3">랜덤 전략 3</option>
            </select>
          </label>

          <label style={{ color: 'white' }}>
            시작일:
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', color: 'black', backgroundColor: 'white' }} />
          </label>

          <label style={{ color: 'white' }}>
            종료일:
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', color: 'black', backgroundColor: 'white' }} />
          </label>

          <label style={{ color: 'white' }}>
            시간봉:
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} style={{ width: '100%', padding: '0.5rem', color: 'black', backgroundColor: 'white' }}>
              <option value="5m">5분봉</option>
              <option value="15m">15분봉</option>
              <option value="1h">1시간</option>
              <option value="4h">4시간</option>
            </select>
          </label>

          <button onClick={handleBacktest} style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#3b82f6', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
            백테스트 실행
          </button>

          {results.length > 0 && (
            <button onClick={() => downloadCSV(flatChartData)} style={{ padding: '0.5rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              📥 CSV 저장
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#ccc' }}>🧪 테스트 조건 요약</h3>
            <ul style={{ lineHeight: '1.7', cursor: 'pointer' }}>
              {results.map((r, i) => (
                <li key={i} onClick={() => setExpanded(expanded === r.label ? null : r.label)} style={{ marginBottom: '0.3rem' }}>
                  ✅ <span style={{ color: '#4ade80' }}>{r.label}</span>
                  {expanded === r.label && (
                    <ul style={{ paddingLeft: '1rem', marginTop: '0.4rem', fontSize: '0.85rem', color: '#ddd' }}>
                      <li>총 진입: {r.stats.entries}회</li>
                      <li>승률: {r.stats.winrate}%</li>
                      <li>손익비(RR): {r.stats.rr}</li>
                      <li>수익률: {r.stats.profit}%</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 오른쪽 차트 영역 */}
      <div style={{ flex: 1, marginLeft: '3rem', backgroundColor: '#121212', padding: '2rem', borderRadius: '10px' }}>
        <h3 style={{ marginBottom: '1rem' }}>📈 전략 비교 차트</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={flatChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>📉 전략 진입 마킹 차트</h3>
          <LightweightChart entries={allEntries} candles={allCandles} />
        </div>
      </div>
    </div>
  );
}
