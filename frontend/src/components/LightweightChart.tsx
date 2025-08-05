
'use client';

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  CrosshairMode,
  Time,
  CandlestickData,
  SeriesMarker,
} from 'lightweight-charts';

type Entry = {
  time: string;
  type: 'long' | 'short';
  price: number;
  profitRate?: number;
};

type Props = {
  candles: CandlestickData[];
  entries: Entry[];
};

export default function LightweightChart({ candles, entries }: Props) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'white',
        background: { type: 'solid', color: 'black' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
      timeScale: {
        borderColor: '#71649C',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const parsedCandles = candles
      .map(c => {
        let t = c.time;
        if (typeof t === 'string') {
          const parsed = new Date(t).getTime();
          if (isNaN(parsed)) return null;
          t = Math.floor(parsed / 1000);
        } else if (typeof t === 'number') {
          t = Math.floor(t);
        } else {
          return null;
        }

        return {
          ...c,
          time: t
        };
      })
      .filter(c => c !== null && !isNaN(c.time))
      .sort((a, b) => (a!.time as number) - (b!.time as number));

    const series = chart.addCandlestickSeries();
    series.setData(parsedCandles as CandlestickData[]);

    const markers: SeriesMarker<CandlestickData['time']>[] = [];

    entries.forEach((entry) => {
      const price = entry.price;
      const marker = {
        time: Math.floor(new Date(entry.time).getTime() / 1000) as Time,
        position: entry.type === 'long' ? 'belowBar' : 'aboveBar',
        color: entry.type === 'long' ? 'green' : 'red',
        shape: entry.type === 'long' ? 'arrowUp' : 'arrowDown',
        text: typeof entry.profitRate === 'number'
          ? `trendline ${entry.profitRate.toFixed(2)}%`
          : 'trendline',
        size: 2,
        id: `${entry.time}-${entry.type}`,
        price,
      };
      markers.push(marker);
    });

    series.setMarkers(markers);

    return () => chart.remove();
  }, [candles, entries]);

  return <div ref={chartContainerRef} />;
}
