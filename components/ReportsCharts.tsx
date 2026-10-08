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

const PALETTE = ['#0a1f44', '#c9a227', '#1f4d88', '#d9b64a', '#173a68', '#e7cb7c', '#060f24'];

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
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
  };

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100 lg:col-span-2">
        <h2 className="mb-3 font-bold text-navy-900">{t('depPerMonth')}</h2>
        <Bar
          data={{
            labels: months,
            datasets: [{ label: t('departures'), data: depCounts, backgroundColor: '#c9a227', borderRadius: 6 }],
          }}
          options={barOpts}
        />
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
        <h2 className="mb-3 font-bold text-navy-900">{t('tradeBreakdown')}</h2>
        <Doughnut
          data={{
            labels: trade.labels,
            datasets: [{ label: t('candidates'), data: trade.data, backgroundColor: PALETTE, borderColor: '#fff', borderWidth: 2 }],
          }}
          options={{ responsive: true, plugins: { legend: { position: 'bottom' as const } } }}
        />
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
        <h2 className="mb-3 font-bold text-navy-900">{t('countryBreakdown')}</h2>
        <Doughnut
          data={{
            labels: country.labels,
            datasets: [{ label: t('candidates'), data: country.data, backgroundColor: PALETTE.slice(0, 3), borderColor: '#fff', borderWidth: 2 }],
          }}
          options={{ responsive: true, plugins: { legend: { position: 'bottom' as const } } }}
        />
      </div>
    </div>
  );
}
