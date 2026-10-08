'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../../../lib/i18n';
import AdminGate from '../../../components/AdminGate';
import { getEmployers, saveEmployers } from '../../../lib/store';
import type { EmployerDemand } from '../../../lib/data';

export default function EmployersPage() {
  return (
    <AdminGate>
      <EmployersTable />
    </AdminGate>
  );
}

function EmployersTable() {
  const { t } = useLang();
  const [demands, setDemands] = useState<EmployerDemand[]>([]);

  useEffect(() => {
    setDemands(getEmployers());
  }, []);

  const adjust = (id: string, delta: 1 | -1) => {
    const next = demands.map((d) =>
      d.id === id ? { ...d, filled: Math.min(d.requested, Math.max(0, d.filled + delta)) } : d
    );
    setDemands(next);
    saveEmployers(next);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12">
      <div className="pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navAdmin')}</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">{t('empTitle')}</h1>
        <p className="mt-1.5 text-sm text-navy-600">{t('empSubtitle')}</p>
      </div>

      <div className="mt-6 space-y-4">
        {demands.map((d) => {
          const pct = Math.round((d.filled / d.requested) * 100);
          return (
            <div key={d.id} className="card card-hover p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-extrabold text-navy-900">{d.employer}</h2>
                  <p className="mt-0.5 text-sm text-navy-600">
                    {d.country} · {d.trade}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-lg font-black text-navy-900">
                    {d.filled} <span className="text-navy-400">/</span> {d.requested}
                  </p>
                  <p className="text-xs font-medium text-navy-500">
                    {t('colDeadline')}: {d.deadline}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-navy-100/70" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${d.employer} ${t('colFilled')}`}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #173a68 0%, #c9a227 100%)' }}
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold text-navy-600">{t('adjustTitle')}:</span>
                <button
                  onClick={() => adjust(d.id, -1)}
                  className="rounded-lg bg-white px-3.5 py-1.5 text-sm font-black text-navy-900 ring-1 ring-navy-200 transition hover:bg-navy-50 hover:ring-gold-400"
                  aria-label="-1"
                >
                  −
                </button>
                <button
                  onClick={() => adjust(d.id, 1)}
                  className="rounded-lg bg-white px-3.5 py-1.5 text-sm font-black text-navy-900 ring-1 ring-navy-200 transition hover:bg-navy-50 hover:ring-gold-400"
                  aria-label="+1"
                >
                  +
                </button>
                <span className="ml-auto text-xs font-bold text-navy-600">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
