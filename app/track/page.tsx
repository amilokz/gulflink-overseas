'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '../../lib/i18n';
import { findCandidateByPhoneCnic } from '../../lib/store';
import type { Candidate } from '../../lib/data';

export default function TrackPage() {
  const { t } = useLang();
  const [phone, setPhone] = useState('');
  const [cnic4, setCnic4] = useState('');
  const [result, setResult] = useState<Candidate | null | 'none'>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(findCandidateByPhoneCnic(phone, cnic4) ?? 'none');
  };

  const inputCls =
    'w-full rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm text-navy-900 outline-none focus:ring-2 focus:ring-gold-400';

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy-900">{t('trackTitle')}</h1>
      <p className="mt-2 text-navy-700">{t('trackSubtitle')}</p>

      <form onSubmit={check} className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-900" htmlFor="t-phone">
              {t('phoneLabel')}
            </label>
            <input id="t-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="0300-1234567" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy-900" htmlFor="t-cnic4">
              {t('cnic4Label')}
            </label>
            <input id="t-cnic4" required value={cnic4} onChange={(e) => setCnic4(e.target.value)} className={inputCls} inputMode="numeric" maxLength={4} placeholder="4321" />
          </div>
        </div>
        <button type="submit" className="mt-5 w-full rounded-lg bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800 sm:w-auto">
          {t('checkBtn')}
        </button>
        <p className="mt-3 text-xs text-navy-600">💡 {t('demoHint')}</p>
      </form>

      {result === 'none' && (
        <div className="mt-6 rounded-2xl bg-red-50 p-6 text-red-900 ring-1 ring-red-200">
          <p className="font-medium">{t('notFound')}</p>
        </div>
      )}

      {result && result !== 'none' && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100 sm:p-8">
          <h2 className="text-xl font-bold text-navy-900">{result.name}</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-navy-50 p-3">
              <dt className="text-navy-600">{t('jobLabel')}</dt>
              <dd className="font-semibold text-navy-900">{result.trade}</dd>
            </div>
            <div className="rounded-lg bg-navy-50 p-3">
              <dt className="text-navy-600">{t('countryLabel')}</dt>
              <dd className="font-semibold text-navy-900">{result.country}</dd>
            </div>
            <div className="rounded-lg bg-navy-50 p-3">
              <dt className="text-navy-600">{t('appliedOn')}</dt>
              <dd className="font-semibold text-navy-900">{result.appliedDate}</dd>
            </div>
          </dl>
          <div className="mt-5 rounded-xl bg-gold-100 p-4 ring-1 ring-gold-500/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700">{t('stageLabel')}</p>
            <p className="mt-1 text-lg font-extrabold text-navy-900">{t(`stage_${result.stage.replace('-', '_')}`)}</p>
          </div>
          <div className="mt-4 rounded-xl bg-navy-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-700">{t('nextStepLabel')}</p>
            <p className="mt-1 text-navy-900">{t(`next_${result.stage.replace('-', '_')}`)}</p>
          </div>
          <Link href="/fees" className="mt-4 inline-block text-sm font-semibold text-navy-700 underline underline-offset-2 hover:text-navy-900">
            {t('navFees')}
          </Link>
        </div>
      )}
    </div>
  );
}
