'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useLang } from '../../lib/i18n';
import jobsData from '../../data/jobs.json';

const COUNTRIES = ['Saudi Arabia', 'UAE', 'Qatar'];
const TRADES = ['Electrician', 'Driver', 'Plumber', 'Welder', 'Mason', 'Cook'];

export default function JobsPage() {
  const { t } = useLang();
  const [country, setCountry] = useState('All');
  const [trade, setTrade] = useState('All');

  const jobs = useMemo(
    () =>
      (jobsData as typeof jobsData).filter(
        (j) => (country === 'All' || j.country === country) && (trade === 'All' || j.trade === trade)
      ),
    [country, trade]
  );

  const filtered = country !== 'All' || trade !== 'All';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navJobs')}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">{t('jobsTitle')}</h1>
      <p className="mt-2 max-w-2xl text-navy-700">{t('jobsSubtitle')}</p>

      <div className="card mt-6 flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <label className="flex items-center gap-2.5 text-sm font-semibold text-navy-900">
          <span className="text-navy-600">{t('filterCountry')}</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="input w-auto">
            <option value="All">{t('all')}</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2.5 text-sm font-semibold text-navy-900">
          <span className="text-navy-600">{t('filterTrade')}</span>
          <select value={trade} onChange={(e) => setTrade(e.target.value)} className="input w-auto">
            <option value="All">{t('all')}</option>
            {TRADES.map((tr) => (
              <option key={tr} value={tr}>
                {tr}
              </option>
            ))}
          </select>
        </label>
        <p className="ml-auto text-sm font-semibold text-navy-600" role="status">
          <span className="badge-navy">{jobs.length}</span>{' '}
          <span className="ml-1">{t('statJobs')}</span>
        </p>
        {filtered && (
          <button
            onClick={() => {
              setCountry('All');
              setTrade('All');
            }}
            className="text-sm font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-600"
          >
            {t('all')}
          </button>
        )}
      </div>

      {jobs.length === 0 && (
        <div className="card mt-8 p-10 text-center">
          <p className="text-navy-700">{t('noJobs')}</p>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((j) => (
          <article key={j.id} className="card card-hover flex flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="badge-navy">{j.country}</span>
              <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800 ring-1 ring-gold-500/30">
                {j.trade}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-extrabold leading-snug text-navy-900">{j.title}</h2>
            <p className="mt-1 text-sm text-navy-600">{j.employer}</p>
            <p className="mt-4 rounded-xl bg-navy-50 px-4 py-3 text-2xl font-black text-navy-900">
              {j.currency} {j.salaryLocal.toLocaleString()}
              <span className="block text-xs font-semibold text-navy-600">
                ≈ PKR {j.salaryPkr.toLocaleString()}
                {t('perMonth')}
              </span>
            </p>
            <dl className="mt-4 flex-1 space-y-2 text-sm text-navy-700">
              <div className="flex justify-between gap-3 border-b border-navy-50 pb-2">
                <dt>{t('dutyLabel')}</dt>
                <dd className="font-semibold text-navy-900">{j.dutyHours}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-navy-50 pb-2">
                <dt>
                  {t('foodLabel')} / {t('accomLabel')}
                </dt>
                <dd className="font-semibold text-navy-900">
                  {j.food} / {j.accommodation}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-navy-50 pb-2">
                <dt>{t('contractLabel')}</dt>
                <dd className="font-semibold text-navy-900">{j.contractLength}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{t('vacanciesLabel')}</dt>
                <dd className="font-semibold text-navy-900">{j.vacancies}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-navy-500">
              {t('permNoLabel')} {j.permissionNo} {t('permSample')}
            </p>
            <Link href={`/jobs/${j.id}`} className="btn-navy mt-4 w-full px-4 py-2.5 text-sm">
              {t('viewDetails')} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
