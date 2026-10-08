'use client';

import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useLang } from '../lib/i18n';
import type { Candidate } from '../lib/data';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Bar = dynamic(() => import('react-chartjs-2').then((m) => m.Bar), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then((m) => m.Doughnut), { ssr: false });

const PALETTE = ['#0a1f44', '#c9a227', '#1f4d88', '#d9b64a', '#173a68', '#e7cb7c', '#5e4a10'];

function countBy(list: Candidate[], key: (c: Candidate) => string): { labels: string[]; data: number[] } {
  const map = new Map<string, number>();
  for (const c of list) {
    const k = key(c);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return { labels: [...map.keys()], data: [...map.values()] };
}

export default function ReportsCharts({ candidates }: { candidates: Candidate[] }) {
  const { t } = useLang();
  const departed = candidates.filter((c) => c.stage === 'departed' && c.departureDate);

  const months = [...new Set(departed.map((c) => c.departureDate!.slice(0, 7)))].sort();
  const depCounts = months.map((m) => departed.filter((c) => c.departureDate!.startsWith(m)).length);

  const trade = countBy(candidates, (c) => c.trade);
  const country = countBy(candidates, (c) => c.country);

  const barOpts = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0a1f44',
        titleColor: '#e7cb7c',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#eef2f9' } },
      x: { grid: { display: false } },
    },
  };

  const cardCls = 'card p-5 sm:p-6';
  const titleCls = 'mb-1 text-base font-extrabold tracking-tight text-navy-900';
  const subCls = 'mb-4 text-xs font-medium text-navy-500';

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className={`${cardCls} lg:col-span-2`}>
        <h2 className={titleCls}>{t('depPerMonth')}</h2>
        <p className={subCls}>{t('repSubtitle')}</p>
        <Bar
          data={{
            labels: months,
            datasets: [
              {
                label: t('departures'),
                data: depCounts,
                backgroundColor: '#c9a227',
                hoverBackgroundColor: '#e7cb7c',
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          }}
          options={barOpts}
        />
      </div>
      <div className={cardCls}>
        <h2 className={titleCls}>{t('tradeBreakdown')}</h2>
        <p className={subCls}>{t('candidates')}</p>
        <Doughnut
          data={{
            labels: trade.labels,
            datasets: [{ label: t('candidates'), data: trade.data, backgroundColor: PALETTE, borderColor: '#fff', borderWidth: 3 }],
          }}
          options={{
            responsive: true,
            cutout: '62%',
            plugins: {
              legend: { position: 'bottom' as const, labels: { boxWidth: 12, boxHeight: 12, borderRadius: 4, usePointStyle: true } },
              tooltip: { backgroundColor: '#0a1f44', titleColor: '#e7cb7c', bodyColor: '#fff', padding: 12, cornerRadius: 10 },
            },
          }}
        />
      </div>
      <div className={cardCls}>
        <h2 className={titleCls}>{t('countryBreakdown')}</h2>
        <p className={subCls}>{t('candidates')}</p>
        <Doughnut
          data={{
            labels: country.labels,
            datasets: [{ label: t('candidates'), data: country.data, backgroundColor: PALETTE.slice(0, 3), borderColor: '#fff', borderWidth: 3 }],
          }}
          options={{
            responsive: true,
            cutout: '62%',
            plugins: {
              legend: { position: 'bottom' as const, labels: { boxWidth: 12, boxHeight: 12, borderRadius: 4, usePointStyle: true } },
              tooltip: { backgroundColor: '#0a1f44', titleColor: '#e7cb7c', bodyColor: '#fff', padding: 12, cornerRadius: 10 },
            },
          }}
        />
      </div>
    </div>
  );
}
