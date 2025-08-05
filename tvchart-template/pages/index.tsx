
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TVChartPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/charting_library/charting_library.standalone.js';
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tv_chart_container",
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "15",
        timezone: "Asia/Seoul",
        theme: "Dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        calendar: true,
        support_host: "https://www.tradingview.com",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
