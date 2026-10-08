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

  const stats = [
    { value: String(jobs.length), label: t('statJobs') },
    { value: '350+', label: t('statCandidates') },
    { value: String(employers.length), label: t('statEmployers') },
  ];

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="hero-mesh text-white">
        <div className="hero-grid" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <span className="reveal badge-glass">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                {t('licenseLabel')} {t('licenseValue')}
              </span>
              <h1 className="reveal reveal-d1 mt-5 text-balance text-4xl font-black leading-[1.08] sm:text-6xl">
                {t('heroTitle')}
              </h1>
              <p className="reveal reveal-d2 mt-5 max-w-2xl text-pretty text-base leading-relaxed text-navy-100/85 sm:text-lg">
                {t('heroProblem')}
              </p>
              <div className="reveal reveal-d3 mt-8 flex flex-wrap gap-3">
                <Link href="/jobs" className="btn-gold px-7 py-3.5 text-base">
                  {t('ctaBrowseJobs')}
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/track" className="btn-ghost-light px-7 py-3.5 text-base">
                  {t('ctaTrack')}
                </Link>
              </div>
              <div className="reveal reveal-d4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-100/70">
                <span className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2.4" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t('step3T')}
                </span>
                <span className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2.4" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t('feesNoteTitle')}
                </span>
                <span className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2.4" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t('aiSimLabel')}
                </span>
              </div>
            </div>

            {/* Decorative CSS art: orbit rings + floating glass cards */}
            <div className="relative mx-auto hidden h-[380px] w-full max-w-[420px] select-none lg:block" aria-hidden>
              <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/25" />
              <div className="spin-slower absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/35">
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_16px_4px_rgba(217,182,74,.6)]" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/20" />
              <div
                className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl text-5xl font-black text-navy-950"
                style={{
                  background: 'linear-gradient(135deg, #e7cb7c 0%, #c9a227 60%, #a8861f 100%)',
                  boxShadow: '0 24px 60px -12px rgba(201,162,39,.75), inset 0 2px 0 rgba(255,255,255,.5)',
                }}
              >
                G
              </div>
              <div
                className="float-slow absolute left-0 top-8 rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(231,203,124,.3)', boxShadow: '0 16px 40px -16px rgba(0,0,0,.5)' }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">Visa</p>
                <p className="mt-0.5 font-bold text-white">Approved ✓ <span className="text-[10px] font-medium text-navy-100/60">(sample)</span></p>
              </div>
              <div
                className="float-slower absolute bottom-10 right-0 rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(231,203,124,.3)', boxShadow: '0 16px 40px -16px rgba(0,0,0,.5)', animationDelay: '1.4s' }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">Receipt</p>
                <p className="mt-0.5 font-bold text-white">PKR 25,000 ✓ <span className="text-[10px] font-medium text-navy-100/60">(sample)</span></p>
              </div>
              <div
                className="float-slow absolute bottom-2 left-10 rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(231,203,124,.3)', boxShadow: '0 16px 40px -16px rgba(0,0,0,.5)', animationDelay: '2.6s' }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-300">Stage</p>
                <p className="mt-0.5 font-bold text-white">Medical → Visa</p>
              </div>
            </div>
          </div>
        </div>
        {/* soft curve into page */}
        <svg className="relative block h-8 w-full text-navy-50" viewBox="0 0 1440 32" preserveAspectRatio="none" aria-hidden>
          <path d="M0 32h1440V8C1200 26 960 32 720 32S240 26 0 8v24z" fill="currentColor" />
        </svg>
      </section>

      {/* ================= TRUST BOX ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="reveal card card-gold-top card-hover p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #faf3df 0%, #fdfaf0 100%)' }}>
          <div className="flex items-start gap-5">
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-gold-300"
              style={{ background: 'linear-gradient(135deg, #0a1f44, #173a68)', boxShadow: '0 12px 24px -10px rgba(10,31,68,.6)' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-navy-900 sm:text-2xl">{t('trustTitle')}</h2>
              <p className="mt-2 max-w-2xl text-pretty text-base font-medium leading-relaxed text-navy-800 sm:text-lg">
                {t('trustBody')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className={`card card-hover p-4 text-center sm:p-7 reveal reveal-d${i + 1}`}>
              <p className="gold-text text-3xl font-black sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-600 sm:text-sm sm:normal-case sm:tracking-normal sm:font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Process</p>
            <h2 className="mt-1 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('howTitle')}</h2>
          </div>
          <Link href="/jobs" className="btn-outline hidden px-4 py-2 text-sm sm:inline-flex">
            {t('ctaBrowseJobs')} →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className={`card card-hover card-gold-top p-6 reveal reveal-d${i + 1}`}>
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-navy-950"
                style={{ background: 'linear-gradient(135deg, #e7cb7c, #c9a227)', boxShadow: '0 8px 18px -8px rgba(201,162,39,.8)' }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-extrabold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OFFICE + TRACK CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="panel-navy relative overflow-hidden p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, #c9a227, transparent)' }}
          />
          <div className="relative grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">{t('addressLabel')}</p>
              <p className="mt-3 text-lg font-semibold text-white">{t('addressValue')}</p>
              <p className="mt-3 text-sm text-navy-100/70">
                {t('licenseLabel')} {t('licenseValue')}
              </p>
            </div>
            <div className="sm:border-l sm:border-white/10 sm:pl-8">
              <h3 className="text-xl font-extrabold text-white">{t('ctaTrack')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100/75">{t('trackSubtitle')}</p>
              <Link href="/track" className="btn-gold mt-5 px-6 py-3 text-sm">
                {t('navTrack')} →
              </Link>
            </div>
          </div>
          <p className="relative mt-8 border-t border-white/10 pt-4 text-xs text-navy-100/50">{t('sampleNote')}</p>
        </div>
      </section>
    </div>
  );
}
