'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '../../../lib/i18n';
import { addCandidate, getCandidates } from '../../../lib/store';
import { uid, todayISO, type Job, type DocStatus } from '../../../lib/data';

const DOC_FIELDS = [
  { key: 'passportFile', labelKey: 'docPassport' },
  { key: 'cnicFile', labelKey: 'docCnic' },
  { key: 'photoFile', labelKey: 'docPhoto' },
  { key: 'skillFile', labelKey: 'docSkill' },
  { key: 'medicalFile', labelKey: 'docMedical' },
] as const;

export default function JobDetailClient({ job }: { job: Job }) {
  const { t } = useLang();
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [form, setForm] = useState({
    name: '',
    cnic: '',
    phone: '',
    trade: job.trade,
    experience: '',
    passport: 'yes',
    skillTest: 'Not taken',
  });
  const [files, setFiles] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFile = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFiles((s) => ({ ...s, [key]: f.name }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = getCandidates();
    const docStatus = (key: string): DocStatus => (files[key] ? 'uploaded' : 'pending');
    const candidate = {
      id: uid('app'),
      name: form.name.trim(),
      phone: form.phone.trim(),
      cnic: form.cnic.replace(/[\s-]/g, ''),
      trade: form.trade,
      country: job.country,
      jobId: job.id,
      experience: form.experience.trim(),
      passport: form.passport === 'yes',
      skillTest: form.skillTest,
      appliedDate: todayISO(),
      stage: 'applied' as const,
      documents: {
        passport: docStatus('passportFile'),
        cnic: docStatus('cnicFile'),
        photos: docStatus('photoFile'),
        skillTestCert: docStatus('skillFile'),
        medical: docStatus('medicalFile'),
        visa: 'pending' as DocStatus,
      },
      notes: [],
      receipts: [],
      files,
    };
    // avoid duplicate submission creating identical rows on re-render
    if (!existing.some((c) => c.phone === candidate.phone && c.cnic === candidate.cnic && c.jobId === job.id)) {
      addCandidate(candidate);
    }
    setDone({ id: candidate.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="card card-gold-top p-8 text-center sm:p-10">
          <span
            aria-hidden
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white"
            style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', boxShadow: '0 12px 24px -8px rgba(34,197,94,.6)' }}
          >
            ✓
          </span>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">{t('successTitle')}</h1>
          <p className="mx-auto mt-3 max-w-md text-navy-700">{t('successBody')}</p>
          <p className="mt-5 inline-block rounded-xl bg-navy-50 px-4 py-2 text-sm text-navy-600 ring-1 ring-navy-100">
            {t('appIdLabel')}: <span className="font-mono font-bold text-navy-900">{done.id}</span>
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/track" className="btn-gold px-6 py-3 text-sm">
              {t('trackNow')}
            </Link>
            <Link href="/jobs" className="btn-outline px-6 py-3 text-sm">
              {t('backToJobs')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition hover:text-navy-900">
        <span aria-hidden>←</span> {t('backToJobs')}
      </Link>

      <div className="panel-navy relative mt-4 overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #c9a227, transparent)' }}
        />
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="badge-gold">{job.country}</span>
          <span className="badge-glass">{job.trade}</span>
        </div>
        <h1 className="relative mt-3 text-balance text-2xl font-black tracking-tight sm:text-4xl">
          {job.title} — {job.employer}
        </h1>
        <p className="relative mt-2 max-w-2xl text-navy-100/85">{job.description}</p>
        <p className="relative mt-5 text-3xl font-black sm:text-4xl">
          <span className="gold-text">
            {job.currency} {job.salaryLocal.toLocaleString()}
          </span>
          <span className="text-base font-semibold text-navy-100/80">
            {' '}
            ≈ PKR {job.salaryPkr.toLocaleString()}
            {t('perMonth')}
          </span>
        </p>
        <dl className="relative mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            [t('dutyLabel'), job.dutyHours],
            [t('foodLabel'), job.food],
            [t('accomLabel'), job.accommodation],
            [t('contractLabel'), job.contractLength],
          ].map(([k, v]) => (
            <div
              key={k as string}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)' }}
            >
              <dt className="text-xs text-navy-100/65">{k}</dt>
              <dd className="mt-1 font-bold text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="relative mt-4 text-[11px] text-navy-100/60">
          {t('permNoLabel')} {job.permissionNo} {t('permSample')}
        </p>
      </div>

      <form onSubmit={submit} className="card mt-6 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold tracking-tight text-navy-900 sm:text-2xl">{t('applyTitle')}</h2>
        <p className="mt-1 text-sm text-navy-600">{t('applySubtitle')}</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="f-name">{t('nameLabel')}</label>
            <input id="f-name" required value={form.name} onChange={set('name')} className="input" autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="f-cnic">{t('cnicLabel')}</label>
            <input id="f-cnic" required value={form.cnic} onChange={set('cnic')} inputMode="numeric" className="input" placeholder="37405-1234567-8" />
          </div>
          <div>
            <label className="label" htmlFor="f-phone">{t('phoneLabel')}</label>
            <input id="f-phone" required value={form.phone} onChange={set('phone')} inputMode="tel" className="input" placeholder="0300-1234567" autoComplete="tel" />
          </div>
          <div>
            <label className="label" htmlFor="f-trade">{t('tradeLabel')}</label>
            <select id="f-trade" value={form.trade} onChange={set('trade')} className="input">
              {['Electrician', 'Driver', 'Plumber', 'Welder', 'Mason', 'Cook'].map((tr) => (
                <option key={tr} value={tr}>{tr}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="f-exp">{t('expLabel')}</label>
            <input id="f-exp" value={form.experience} onChange={set('experience')} inputMode="numeric" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="f-skill">{t('skillTestLabel')}</label>
            <select id="f-skill" value={form.skillTest} onChange={set('skillTest')} className="input">
              <option value="Not taken">{t('skillNotTaken')}</option>
              <option value="Scheduled">{t('skillScheduled')}</option>
              <option value="Passed">{t('skillPassed')}</option>
              <option value="Failed">{t('skillFailed')}</option>
            </select>
          </div>
          <fieldset className="sm:col-span-2">
            <legend className="label">{t('passportLabel')}</legend>
            <div className="flex gap-3 text-sm">
              {[
                ['yes', t('yes')],
                ['no', t('no')],
              ].map(([v, label]) => (
                <label
                  key={v}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 ring-1 transition ${
                    form.passport === v ? 'bg-gold-100 font-bold text-navy-900 ring-gold-500/60' : 'bg-white text-navy-700 ring-navy-200 hover:ring-gold-400'
                  }`}
                >
                  <input type="radio" name="passport" value={v} checked={form.passport === v} onChange={set('passport')} className="accent-[#c9a227]" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-bold text-navy-900">{t('docsLabel')}</h3>
          <p className="mt-1 text-xs text-navy-600">{t('docsHint')}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {DOC_FIELDS.map((d) => (
              <label key={d.key} className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-navy-200 bg-navy-50 px-3.5 py-3 text-sm transition hover:border-gold-400 hover:bg-gold-50">
                <span className="font-medium text-navy-900">{t(d.labelKey)}</span>
                <span className="flex items-center gap-2">
                  {files[d.key] && (
                    <span className="max-w-[130px] truncate text-[11px] font-semibold text-green-700">
                      {files[d.key]} ✓ {t('fileSaved')}
                    </span>
                  )}
                  <span className="rounded-lg bg-navy-900 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-navy-700">
                    {t('chooseFile')}
                    <input type="file" className="hidden" onChange={onFile(d.key)} />
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-gold mt-8 w-full px-6 py-3.5 text-base sm:w-auto sm:px-10">
          {t('submitApplication')}
        </button>
      </form>
    </div>
  );
}
