'use client';

import Link from 'next/link';
import { useLang } from '../lib/i18n';

export default function Footer() {
  const { t } = useLang();

  const explore = [
    { href: '/', label: t('navHome') },
    { href: '/jobs', label: t('navJobs') },
    { href: '/track', label: t('navTrack') },
    { href: '/fees', label: t('navFees') },
    { href: '/admin', label: t('navAdmin') },
  ];

  return (
    <footer
      className="relative mt-16 overflow-hidden text-navy-100"
      style={{
        background: 'linear-gradient(180deg, #060f24 0%, #0a1f44 100%)',
      }}
    >
      {/* gold top border */}
      <div
        aria-hidden
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a227 20%, #e7cb7c 50%, #c9a227 80%, transparent)' }}
      />
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, #c9a227, transparent)' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl font-black text-navy-950"
                style={{
                  background: 'linear-gradient(135deg, #e7cb7c 0%, #c9a227 55%, #a8861f 100%)',
                  boxShadow: '0 8px 20px -6px rgba(201,162,39,.7)',
                }}
              >
                G
              </span>
              <div>
                <p className="font-extrabold tracking-tight text-white">{t('brandName')}</p>
                <p className="text-xs font-medium text-gold-300">
                  {t('licenseLabel')} {t('licenseValue')}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">{t('heroProblem')}</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-navy-100/80 transition hover:text-gold-300"
                  >
                    <span aria-hidden className="h-px w-3 bg-gold-500/60 transition-all group-hover:w-5 group-hover:bg-gold-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Office + CTA */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{t('addressLabel')}</p>
            <p className="mt-4 text-sm text-navy-100/80">{t('addressValue')}</p>
            <p className="mt-2 text-xs text-navy-100/50">
              {t('licenseLabel')} {t('licenseValue')}
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-5 px-5 py-2.5 text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.5-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
              </svg>
              {t('buildForBusiness')}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-medium text-white">{t('demoNote')}</p>
          <p className="text-xs text-navy-100/50">{t('sampleNote')}</p>
        </div>
      </div>
    </footer>
  );
}
