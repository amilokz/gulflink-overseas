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
      <div className="pt-4">
        <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('empTitle')}</h1>
        <p className="mt-1 text-sm text-navy-700">{t('empSubtitle')}</p>
      </div>

      <div className="mt-6 space-y-4">
        {demands.map((d) => {
          const pct = Math.round((d.filled / d.requested) * 100);
          return (
            <div key={d.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-navy-900">{d.employer}</h2>
                  <p className="text-sm text-navy-700">
                    {d.country} · {d.trade}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-bold text-navy-900">
                    {d.filled} / {d.requested}
                  </p>
                  <p className="text-xs text-navy-600">
                    {t('colDeadline')}: {d.deadline}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-navy-50" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${d.employer} ${t('colFilled')}`}>
                <div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-600">{t('adjustTitle')}:</span>
                <button
                  onClick={() => adjust(d.id, -1)}
                  className="rounded-md bg-white px-3 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 hover:bg-navy-50"
                  aria-label="-1"
                >
                  −
                </button>
                <button
                  onClick={() => adjust(d.id, 1)}
                  className="rounded-md bg-white px-3 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 hover:bg-navy-50"
                  aria-label="+1"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
