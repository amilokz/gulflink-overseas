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

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navTrack')}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">{t('trackTitle')}</h1>
      <p className="mt-2 text-navy-700">{t('trackSubtitle')}</p>

      <form onSubmit={check} className="card card-gold-top mt-6 p-6 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="t-phone">
              {t('phoneLabel')}
            </label>
            <input id="t-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className="input" placeholder="0300-1234567" autoComplete="tel" />
          </div>
          <div>
            <label className="label" htmlFor="t-cnic4">
              {t('cnic4Label')}
            </label>
            <input id="t-cnic4" required value={cnic4} onChange={(e) => setCnic4(e.target.value)} className="input" inputMode="numeric" maxLength={4} placeholder="4321" />
          </div>
        </div>
        <button type="submit" className="btn-navy mt-5 w-full px-6 py-3 text-sm sm:w-auto">
          {t('checkBtn')}
        </button>
        <p className="mt-4 rounded-xl bg-gold-100 px-4 py-2.5 text-xs font-medium text-navy-900 ring-1 ring-gold-500/40">
          💡 {t('demoHint')}
        </p>
      </form>

      {result === 'none' && (
        <div className="mt-6 rounded-2xl bg-red-50 p-6 text-red-900 ring-1 ring-red-200" role="alert">
          <p className="font-semibold">{t('notFound')}</p>
        </div>
      )}

      {result && result !== 'none' && (
        <div className="card mt-6 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">{result.name}</h2>
            <span className="badge-gold shrink-0">{t(`stage_${result.stage.replace('-', '_')}`)}</span>
          </div>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-navy-50 p-3.5 ring-1 ring-navy-100">
              <dt className="text-xs text-navy-600">{t('jobLabel')}</dt>
              <dd className="mt-0.5 font-bold text-navy-900">{result.trade}</dd>
            </div>
            <div className="rounded-xl bg-navy-50 p-3.5 ring-1 ring-navy-100">
              <dt className="text-xs text-navy-600">{t('countryLabel')}</dt>
              <dd className="mt-0.5 font-bold text-navy-900">{result.country}</dd>
            </div>
            <div className="rounded-xl bg-navy-50 p-3.5 ring-1 ring-navy-100">
              <dt className="text-xs text-navy-600">{t('appliedOn')}</dt>
              <dd className="mt-0.5 font-bold text-navy-900">{result.appliedDate}</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-xl bg-gold-100 p-4 ring-1 ring-gold-500/40">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-700">{t('stageLabel')}</p>
            <p className="mt-1 text-lg font-black text-navy-900">{t(`stage_${result.stage.replace('-', '_')}`)}</p>
          </div>
          <div className="mt-3 rounded-xl bg-navy-50 p-4 ring-1 ring-navy-100">
            <p className="text-xs font-bold uppercase tracking-wider text-navy-700">{t('nextStepLabel')}</p>
            <p className="mt-1 text-sm leading-relaxed text-navy-900">{t(`next_${result.stage.replace('-', '_')}`)}</p>
          </div>
          <Link href="/fees" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 underline underline-offset-4 decoration-gold-500 hover:text-navy-900">
            {t('navFees')} →
          </Link>
        </div>
      )}
    </div>
  );
}
