'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lib/i18n';
import jobs from '../data/jobs.json';

function Icon({ d, className = '' }: { d: React.ReactNode; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {d}
    </svg>
  );
}

const PATHS = {
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  receipt: (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </>
  ),
  tracker: (
    <>
      <path d="M21 12a9 9 0 1 1-9-9" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  checklist: (
    <>
      <path d="m9 11 2 2 4-4" />
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="m9 17 2 2 4-4" />
    </>
  ),
  board: (
    <>
      <rect x="3" y="3" width="7.5" height="18" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="11" rx="1.5" />
      <path d="M6 8h1.5M6 12h1.5M6 16h1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15v3M12 10v8M17 6v12" />
    </>
  ),
  quote: (
    <path d="M10 8c-3.3 0-6 2.7-6 6v2h5v-5H6.5C6.8 9.6 8.2 8.5 10 8.5V8zm10 0c-3.3 0-6 2.7-6 6v2h5v-5h-2.5c.3-1.4 1.7-2.5 3.5-2.5V8z" />
  ),
};

export default function HomePage() {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const countryCount = new Set(jobs.map((j) => j.country)).size;

  const kanbanStages = ['stage_applied', 'stage_shortlisted', 'stage_visa', 'stage_departed'];

  const trustPills = [t('tp1'), t('tp2'), t('tp3'), t('tp4')];

  const features = [
    { icon: PATHS.shield, title: t('f1T'), desc: t('f1D') },
    { icon: PATHS.receipt, title: t('f2T'), desc: t('f2D') },
    { icon: PATHS.tracker, title: t('f3T'), desc: t('f3D') },
    { icon: PATHS.checklist, title: t('f4T'), desc: t('f4D') },
    { icon: PATHS.board, title: t('f5T'), desc: t('f5D') },
    { icon: PATHS.chart, title: t('f6T'), desc: t('f6D') },
  ];

  const howSteps = [
    { title: t('hs1T'), desc: t('hs1D') },
    { title: t('hs2T'), desc: t('hs2D') },
    { title: t('hs3T'), desc: t('hs3D') },
  ];

  const testimonials = [
    { q: t('t1Q'), n: t('t1N'), m: t('t1M') },
    { q: t('t2Q'), n: t('t2N'), m: t('t2M') },
    { q: t('t3Q'), n: t('t3N'), m: t('t3M') },
  ];

  const faqs = [
    { q: t('fq1'), a: t('fa1') },
    { q: t('fq2'), a: t('fa2') },
    { q: t('fq3'), a: t('fa3') },
    { q: t('fq4'), a: t('fa4') },
    { q: t('fq5'), a: t('fa5') },
  ];

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="hero-mesh text-white">
        <div className="hero-grid" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <span className="reveal badge-glass">
                <Icon d={PATHS.shield} className="!h-[13px] !w-[13px]" />
                {t('licenseLabel')} {t('licenseValue')}
              </span>
              <h1 className="reveal reveal-d1 mt-5 text-balance text-4xl font-black leading-[1.08] sm:text-6xl">
                {t('heroNewTitle')}
              </h1>
              <p className="reveal reveal-d2 mt-5 max-w-2xl text-pretty text-base leading-relaxed text-navy-100/85 sm:text-lg">
                {t('heroNewSub')}
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
              {/* stats row */}
              <div className="reveal reveal-d4 mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-navy-100/85">
                <span className="flex items-center gap-2">
                  <span className="gold-text text-2xl font-black">{jobs.length}</span> {t('statsOpenJobs')}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
                <span className="flex items-center gap-2">
                  <span className="gold-text text-2xl font-black">{countryCount}</span> {t('statsCountries')}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
                <span>{t('statsFeeFull')}</span>
              </div>
            </div>

            {/* CSS-only hero visual: Kanban pipeline mini-card + floating trust cards */}
            <div className="relative mx-auto w-full max-w-[440px] select-none" aria-hidden>
              <div
                className="rounded-3xl p-4 sm:p-5"
                style={{
                  background: 'rgba(255,255,255,.08)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(231,203,124,.28)',
                  boxShadow: '0 30px 80px -24px rgba(0,0,0,.6)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                    {t('kanbanTitle')}
                  </p>
                  <span className="badge-glass !text-[10px]">
                    {t('kanbanPipelineTag')} · {t('permSample')}
                  </span>
                </div>
                <div className="relative mt-4 grid grid-cols-4 gap-2">
                  {kanbanStages.map((s, i) => (
                    <div
                      key={s}
                      className={`rounded-xl p-2 ${i === 2 ? 'drop-hint' : ''}`}
                      style={{
                        background: 'rgba(255,255,255,.05)',
                        border: '1px solid rgba(255,255,255,.08)',
                        minHeight: '128px',
                      }}
                    >
                      <p className="text-center text-[10px] font-bold uppercase tracking-wide text-navy-100/70">
                        {t(s)}
                      </p>
                      {i === 0 && (
                        <>
                          <div className="mt-2 rounded-lg bg-white/10 p-2">
                            <p className="text-[10px] font-bold text-white">Rashid K.</p>
                            <p className="text-[9px] text-navy-100/60">CNIC ✓</p>
                          </div>
                          <div className="mt-1.5 rounded-lg bg-white/10 p-2">
                            <p className="text-[10px] font-bold text-white">Javed S.</p>
                            <p className="text-[9px] text-navy-100/60">Docs ✓</p>
                          </div>
                        </>
                      )}
                      {i === 1 && (
                        <div className="mt-2 rounded-lg bg-white/10 p-2">
                          <p className="text-[10px] font-bold text-white">Farhan M.</p>
                          <p className="text-[9px] text-navy-100/60">Skill ✓</p>
                        </div>
                      )}
                      {i === 3 && (
                        <div className="mt-2 rounded-lg p-2" style={{ background: 'rgba(201,162,39,.18)' }}>
                          <p className="text-[10px] font-bold text-gold-200">✈ Departed</p>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* card mid-drag: tilted, gold ring, between Shortlisted and Visa */}
                  <div
                    className="absolute left-1/2 top-14 w-36 -translate-x-1/2"
                    style={{ transform: 'translateX(-50%) rotate(-6deg)', zIndex: 2 }}
                  >
                    <div
                      className="rounded-xl bg-white p-3"
                      style={{
                        boxShadow: '0 22px 44px -12px rgba(0,0,0,.65)',
                        outline: '2px solid #c9a227',
                        outlineOffset: '1px',
                      }}
                    >
                      <p className="text-xs font-extrabold text-navy-900">{t('kanbanCandidate')}</p>
                      <p className="mt-1 text-[10px] font-medium text-navy-500">Visa → {t('stage_departed')}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-100">
                        <div className="h-full w-3/4 rounded-full" style={{ background: 'linear-gradient(90deg,#c9a227,#e7cb7c)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating trust cards */}
              <div
                className="float-slow absolute -top-7 left-0 rounded-2xl px-4 py-2.5 text-sm sm:-left-6"
                style={{
                  background: 'rgba(10,31,68,.92)',
                  border: '1px solid rgba(231,203,124,.4)',
                  boxShadow: '0 18px 40px -14px rgba(0,0,0,.6)',
                }}
              >
                <p className="flex items-center gap-2 font-bold text-white">
                  <span aria-hidden className="text-gold-400">✓</span> {t('cardTrust1')}
                </p>
              </div>
              <div
                className="float-slower absolute -bottom-7 right-0 rounded-2xl px-4 py-2.5 text-sm sm:-right-6"
                style={{
                  background: 'rgba(10,31,68,.92)',
                  border: '1px solid rgba(231,203,124,.4)',
                  boxShadow: '0 18px 40px -14px rgba(0,0,0,.6)',
                  animationDelay: '1.6s',
                }}
              >
                <p className="flex items-center gap-2 font-bold text-white">
                  <span aria-hidden className="text-gold-400">✓</span> {t('cardTrust2')}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* soft curve into page */}
        <svg className="relative block h-8 w-full text-navy-50" viewBox="0 0 1440 32" preserveAspectRatio="none" aria-hidden>
          <path d="M0 32h1440V8C1200 26 960 32 720 32S240 26 0 8v24z" fill="currentColor" />
        </svg>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-label={t('trustStripTitle')}>
        <p className="reveal text-center text-xs font-bold uppercase tracking-[0.22em] text-gold-700">
          {t('trustStripTitle')}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {trustPills.map((p, i) => (
            <div
              key={p}
              className={`reveal reveal-d${i + 1} card card-hover flex items-center gap-3 p-4 sm:p-5`}
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gold-500"
                style={{ background: 'linear-gradient(135deg, #0a1f44, #173a68)', boxShadow: '0 8px 18px -8px rgba(10,31,68,.6)' }}
              >
                <Icon d={i === 0 ? PATHS.shield : i === 1 ? PATHS.tracker : i === 2 ? PATHS.receipt : PATHS.checklist} className="!h-5 !w-5" />
              </span>
              <p className="text-sm font-bold leading-snug text-navy-900">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Platform</p>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('featuresTitle')}</h2>
          <p className="mt-2 text-pretty text-navy-600">{t('featuresSub')}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className={`reveal reveal-d${(i % 3) + 1} card card-hover card-gold-top p-6`}>
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-gold-400"
                style={{ background: 'linear-gradient(135deg, #0a1f44, #173a68)', boxShadow: '0 10px 22px -10px rgba(10,31,68,.6)' }}
              >
                <Icon d={f.icon} />
              </span>
              <h3 className="mt-4 font-extrabold text-navy-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Process</p>
            <h2 className="mt-1 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('howTitle')}</h2>
            <p className="mt-2 text-pretty text-navy-600">{t('hsSub')}</p>
          </div>
          <Link href="/jobs" className="btn-outline hidden shrink-0 px-4 py-2 text-sm sm:inline-flex">
            {t('ctaBrowseJobs')} →
          </Link>
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {howSteps.map((s, i) => (
            <li key={s.title} className={`reveal reveal-d${i + 1} panel-navy relative overflow-hidden p-6`}>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, #c9a227, transparent)' }}
              />
              <span
                aria-hidden
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl font-black text-navy-950"
                style={{ background: 'linear-gradient(135deg, #e7cb7c, #c9a227)', boxShadow: '0 8px 18px -8px rgba(201,162,39,.8)' }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-extrabold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100/80">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ================= LIVE DEMO CTA BAND ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="reveal panel-navy relative overflow-hidden p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(38rem 20rem at 90% 0%, rgba(201,162,39,.35), transparent 60%), radial-gradient(30rem 18rem at 0% 100%, rgba(201,162,39,.15), transparent 60%)',
            }}
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="badge-glass">{t('aiSimLabel')}</span>
              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">{t('demoBandTitle')}</h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-navy-100/80 sm:text-base">
                {t('demoBandBody')}
              </p>
            </div>
            <Link href="/jobs" className="btn-gold shrink-0 px-7 py-3.5 text-base">
              {t('demoBandCta')} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="stories" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            {t('testiTag')}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('testiTitle')}</h2>
          <p className="mt-2 text-pretty text-navy-600">{t('testiSub')}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((tm, i) => (
            <figure key={tm.n} className={`reveal reveal-d${i + 1} card card-hover flex flex-col p-6`}>
              <span aria-hidden className="text-gold-500">
                <Icon d={PATHS.quote} className="!h-8 !w-8" />
              </span>
              <blockquote className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-navy-800">
                {tm.q}
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-100 pt-4">
                <p className="font-extrabold text-navy-900">{tm.n}</p>
                <p className="mt-0.5 text-xs font-medium text-navy-500">{tm.m}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-28 px-4 py-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">FAQ</p>
          <h2 className="mt-1 text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('faqTitle')}</h2>
          <p className="mt-2 text-pretty text-navy-600">{t('faqSub')}</p>
        </div>
        <div className="mt-6 space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="card overflow-hidden">
                <h3>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-navy-50"
                  >
                    <span className="font-bold text-navy-900">{f.q}</span>
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-black transition-transform duration-200 ${
                        open ? 'rotate-45 bg-gold-500 text-navy-950' : 'bg-navy-100 text-navy-700'
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                {open && (
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="px-5 pb-5 text-sm leading-relaxed text-navy-700"
                  >
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-4 pt-6">
        <div
          className="reveal relative overflow-hidden rounded-3xl p-6 text-center sm:p-12"
          style={{
            background: 'linear-gradient(135deg, #e7cb7c 0%, #c9a227 55%, #a8861f 100%)',
            boxShadow: '0 30px 70px -28px rgba(138,109,26,.7), inset 0 1px 0 rgba(255,255,255,.5)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(30rem 14rem at 50% 120%, rgba(6,15,36,.28), transparent 60%), radial-gradient(20rem 12rem at 90% -20%, rgba(255,255,255,.35), transparent 60%)',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="badge-navy">{t('demoNote')}</span>
            <h2 className="mt-4 text-balance text-2xl font-black text-navy-950 sm:text-4xl">
              {t('finalTitle')}
            </h2>
            <p className="mt-3 text-pretty text-sm font-medium text-navy-900/80 sm:text-base">
              {t('finalBody')}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/jobs" className="btn-navy px-7 py-3.5 text-base">
                {t('ctaBrowseJobs')} <span aria-hidden>→</span>
              </Link>
              <Link href="/track" className="btn-outline px-7 py-3.5 text-base">
                {t('ctaTrack')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
