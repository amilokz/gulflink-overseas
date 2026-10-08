'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../../../lib/i18n';
import AdminGate from '../../../components/AdminGate';
import ReportsCharts from '../../../components/ReportsCharts';
import { getCandidates } from '../../../lib/store';
import type { Candidate } from '../../../lib/data';

export default function ReportsPage() {
  return (
    <AdminGate>
      <ReportsBody />
    </AdminGate>
  );
}

function ReportsBody() {
  const { t } = useLang();
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12">
      <div className="pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navAdmin')}</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">{t('repTitle')}</h1>
        <p className="mt-1.5 text-sm text-navy-600">{t('repSubtitle')}</p>
      </div>
      <ReportsCharts candidates={candidates} />
    </div>
  );
}
