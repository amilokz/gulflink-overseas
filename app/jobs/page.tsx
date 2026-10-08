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

  const selectCls =
    'rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:ring-2 focus:ring-gold-400';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-navy-900">{t('jobsTitle')}</h1>
      <p className="mt-2 text-navy-700">{t('jobsSubtitle')}</p>

      <div className="mt-6 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy-100">
        <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
          {t('filterCountry')}
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
            <option value="All">{t('all')}</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
          {t('filterTrade')}
          <select value={trade} onChange={(e) => setTrade(e.target.value)} className={selectCls}>
            <option value="All">{t('all')}</option>
            {TRADES.map((tr) => (
              <option key={tr} value={tr}>
                {tr}
              </option>
            ))}
          </select>
        </label>
      </div>

      {jobs.length === 0 && <p className="mt-8 text-center text-navy-700">{t('noJobs')}</p>}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((j) => (
          <article key={j.id} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-gold-300">
                {j.country}
              </span>
              <span className="text-xs font-medium text-navy-700">{j.trade}</span>
            </div>
            <h2 className="mt-3 text-lg font-bold text-navy-900">{j.title}</h2>
            <p className="mt-1 text-sm text-navy-700">{j.employer}</p>
            <p className="mt-3 text-2xl font-extrabold text-navy-900">
              {j.currency} {j.salaryLocal.toLocaleString()}
              <span className="text-sm font-medium text-navy-600">
                {' '}
                ≈ PKR {j.salaryPkr.toLocaleString()}
                {t('perMonth')}
              </span>
            </p>
            <dl className="mt-4 space-y-1.5 text-sm text-navy-700">
              <div className="flex justify-between">
                <dt>{t('dutyLabel')}</dt>
                <dd className="font-medium text-navy-900">{j.dutyHours}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t('foodLabel')} / {t('accomLabel')}</dt>
                <dd className="font-medium text-navy-900">
                  {j.food} / {j.accommodation}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>{t('contractLabel')}</dt>
                <dd className="font-medium text-navy-900">{j.contractLength}</dd>
              </div>
              <div className="flex justify-between">
                <dt>{t('vacanciesLabel')}</dt>
                <dd className="font-medium text-navy-900">{j.vacancies}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-navy-600">
              {t('permNoLabel')} {j.permissionNo} {t('permSample')}
            </p>
            <Link
              href={`/jobs/${j.id}`}
              className="mt-4 rounded-lg bg-navy-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-navy-800"
            >
              {t('viewDetails')}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
