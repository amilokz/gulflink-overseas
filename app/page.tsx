'use client';

import Link from 'next/link';
import { useLang } from '../lib/i18n';
import jobs from '../data/jobs.json';
import employers from '../data/employers.json';

export default function HomePage() {
  const { t } = useLang();

  const steps = [
    { title: t('step1T'), desc: t('step1D') },
    { title: t('step2T'), desc: t('step2D') },
    { title: t('step3T'), desc: t('step3D') },
    { title: t('step4T'), desc: t('step4D') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-gold-500/15 px-4 py-1 text-sm text-gold-300 ring-1 ring-gold-500/40">
              {t('licenseLabel')} {t('licenseValue')}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-navy-100/90 sm:text-lg">{t('heroProblem')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="rounded-lg bg-gold-500 px-6 py-3 font-semibold text-navy-950 shadow hover:bg-gold-400"
              >
                {t('ctaBrowseJobs')}
              </Link>
              <Link
                href="/track"
                className="rounded-lg px-6 py-3 font-semibold text-white ring-1 ring-white/40 hover:bg-white/10"
              >
                {t('ctaTrack')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust box */}
      <section className="mx-auto max-w-6xl px-4 -mt-0 py-8">
        <div className="rounded-2xl bg-gold-100 p-6 ring-1 ring-gold-500/50 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-bold text-navy-900">{t('trustTitle')}</h2>
              <p className="mt-2 text-lg font-medium text-navy-900">{t('trustBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="rounded-xl bg-white p-4 sm:p-6 text-center shadow-sm ring-1 ring-navy-100">
            <p className="text-2xl sm:text-4xl font-extrabold text-navy-900">{jobs.length}</p>
            <p className="mt-1 text-xs sm:text-sm text-navy-700">{t('statJobs')}</p>
          </div>
          <div className="rounded-xl bg-white p-4 sm:p-6 text-center shadow-sm ring-1 ring-navy-100">
            <p className="text-2xl sm:text-4xl font-extrabold text-navy-900">350+</p>
            <p className="mt-1 text-xs sm:text-sm text-navy-700">{t('statCandidates')}</p>
          </div>
          <div className="rounded-xl bg-white p-4 sm:p-6 text-center shadow-sm ring-1 ring-navy-100">
            <p className="text-2xl sm:text-4xl font-extrabold text-navy-900">{employers.length}</p>
            <p className="mt-1 text-xs sm:text-sm text-navy-700">{t('statEmployers')}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-navy-900">{t('howTitle')}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy-100">
              <h3 className="font-bold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm text-navy-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office + license */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-bold text-gold-300">{t('addressLabel')}</h3>
              <p className="mt-2">{t('addressValue')}</p>
              <p className="mt-3 text-sm text-navy-100/80">
                {t('licenseLabel')} {t('licenseValue')}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gold-300">{t('ctaTrack')}</h3>
              <p className="mt-2 text-sm text-navy-100/80">{t('trackSubtitle')}</p>
              <Link
                href="/track"
                className="mt-4 inline-block rounded-lg bg-gold-500 px-5 py-2.5 font-semibold text-navy-950 hover:bg-gold-400"
              >
                {t('navTrack')}
              </Link>
            </div>
          </div>
          <p className="mt-6 border-t border-white/10 pt-4 text-xs text-navy-100/60">{t('sampleNote')}</p>
        </div>
      </section>
    </div>
  );
}
