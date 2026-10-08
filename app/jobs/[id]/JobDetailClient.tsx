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

  const inputCls =
    'w-full rounded-lg border border-navy-100 bg-white px-3 py-2.5 text-sm text-navy-900 outline-none focus:ring-2 focus:ring-gold-400';
  const labelCls = 'block text-sm font-semibold text-navy-900 mb-1';

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-navy-100">
          <span aria-hidden className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-navy-900">{t('successTitle')}</h1>
          <p className="mt-3 text-navy-700">{t('successBody')}</p>
          <p className="mt-4 text-sm text-navy-600">
            {t('appIdLabel')}: <span className="font-mono font-bold text-navy-900">{done.id}</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/track" className="rounded-lg bg-navy-900 px-6 py-3 font-semibold text-white hover:bg-navy-800">
              {t('trackNow')}
            </Link>
            <Link href="/jobs" className="rounded-lg px-6 py-3 font-semibold text-navy-900 ring-1 ring-navy-200 hover:bg-navy-50">
              {t('backToJobs')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/jobs" className="text-sm font-medium text-navy-700 hover:text-navy-900">
        ← {t('backToJobs')}
      </Link>

      <div className="mt-4 rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">{job.country}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{job.trade}</span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
          {job.title} — {job.employer}
        </h1>
        <p className="mt-2 max-w-2xl text-navy-100/90">{job.description}</p>
        <p className="mt-4 text-3xl font-extrabold text-gold-300">
          {job.currency} {job.salaryLocal.toLocaleString()}
          <span className="text-base font-medium text-navy-100">
            {' '}
            ≈ PKR {job.salaryPkr.toLocaleString()}
            {t('perMonth')}
          </span>
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            [t('dutyLabel'), job.dutyHours],
            [t('foodLabel'), job.food],
            [t('accomLabel'), job.accommodation],
            [t('contractLabel'), job.contractLength],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-lg bg-white/5 p-3">
              <dt className="text-navy-100/70">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[11px] text-navy-100/70">
          {t('permNoLabel')} {job.permissionNo} {t('permSample')}
        </p>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100 sm:p-8">
        <h2 className="text-xl font-bold text-navy-900">{t('applyTitle')}</h2>
        <p className="mt-1 text-sm text-navy-700">{t('applySubtitle')}</p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="f-name">{t('nameLabel')}</label>
            <input id="f-name" required value={form.name} onChange={set('name')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-cnic">{t('cnicLabel')}</label>
            <input id="f-cnic" required value={form.cnic} onChange={set('cnic')} inputMode="numeric" className={inputCls} placeholder="37405-1234567-8" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-phone">{t('phoneLabel')}</label>
            <input id="f-phone" required value={form.phone} onChange={set('phone')} inputMode="tel" className={inputCls} placeholder="0300-1234567" />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-trade">{t('tradeLabel')}</label>
            <select id="f-trade" value={form.trade} onChange={set('trade')} className={inputCls}>
              {['Electrician', 'Driver', 'Plumber', 'Welder', 'Mason', 'Cook'].map((tr) => (
                <option key={tr} value={tr}>{tr}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="f-exp">{t('expLabel')}</label>
            <input id="f-exp" value={form.experience} onChange={set('experience')} inputMode="numeric" className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f-skill">{t('skillTestLabel')}</label>
            <select id="f-skill" value={form.skillTest} onChange={set('skillTest')} className={inputCls}>
              <option value="Not taken">{t('skillNotTaken')}</option>
              <option value="Scheduled">{t('skillScheduled')}</option>
              <option value="Passed">{t('skillPassed')}</option>
              <option value="Failed">{t('skillFailed')}</option>
            </select>
          </div>
          <fieldset className="sm:col-span-2">
            <legend className={labelCls}>{t('passportLabel')}</legend>
            <div className="flex gap-4 text-sm">
              {[
                ['yes', t('yes')],
                ['no', t('no')],
              ].map(([v, label]) => (
                <label key={v} className="flex items-center gap-2">
                  <input type="radio" name="passport" value={v} checked={form.passport === v} onChange={set('passport')} className="accent-[#c9a227]" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-navy-900">{t('docsLabel')}</h3>
          <p className="mt-1 text-xs text-navy-600">{t('docsHint')}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {DOC_FIELDS.map((d) => (
              <label key={d.key} className="flex items-center justify-between gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 text-sm">
                <span className="text-navy-900">{t(d.labelKey)}</span>
                <span className="flex items-center gap-2">
                  {files[d.key] && <span className="max-w-[120px] truncate text-[11px] text-green-700">{files[d.key]} ✓ {t('fileSaved')}</span>}
                  <span className="cursor-pointer rounded-md bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white">
                    {t('chooseFile')}
                    <input type="file" className="hidden" onChange={onFile(d.key)} />
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-lg bg-gold-500 px-6 py-3.5 font-bold text-navy-950 shadow hover:bg-gold-400 sm:w-auto"
        >
          {t('submitApplication')}
        </button>
      </form>
    </div>
  );
}
