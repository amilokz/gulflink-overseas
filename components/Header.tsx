'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../lib/i18n';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();

  const links = [
    { href: '/jobs', label: t('navJobs'), anchor: false },
    { href: '/#how', label: t('howTitle'), anchor: true },
    { href: '/track', label: t('navTrack'), anchor: false },
    { href: '/fees', label: t('navFees'), anchor: false },
    { href: '/#faq', label: t('navFaq'), anchor: true },
    { href: '/admin', label: t('navAdmin'), anchor: false },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar: sample-license trust pill + language toggle */}
      <div className="border-b border-white/10 bg-navy-950 text-navy-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-xs">
          <p className="flex min-w-0 items-center gap-2 text-navy-100/70">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400 pulse-soft" />
            <span className="truncate">
              {t('licenseLabel')} {t('licenseValue')}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Language">
            <button
              onClick={() => setLang('en')}
              className={`rounded-md px-2.5 py-1 transition ${
                lang === 'en'
                  ? 'bg-gold-500 font-bold text-navy-950 shadow-sm'
                  : 'text-navy-100/80 hover:bg-white/10 hover:text-gold-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ur')}
              className={`rounded-md px-2.5 py-1 transition ${
                lang === 'ur'
                  ? 'bg-gold-500 font-bold text-navy-950 shadow-sm'
                  : 'text-navy-100/80 hover:bg-white/10 hover:text-gold-200'
              }`}
            >
              رومن اردو
            </button>
          </div>
        </div>
      </div>

      {/* Main glass nav */}
      <div
        className="text-white"
        style={{
          background: 'linear-gradient(180deg, rgba(6,15,36,.88) 0%, rgba(10,31,68,.82) 100%)',
          backdropFilter: 'blur(16px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
          boxShadow: '0 12px 34px -14px rgba(6,15,36,.75), inset 0 -1px 0 rgba(231,203,124,.22)',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
          <Link href="/" className="group flex items-center gap-3" aria-label={t('brandName')}>
            <span
              aria-hidden
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl font-black text-navy-950 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #e7cb7c 0%, #c9a227 55%, #a8861f 100%)',
                boxShadow: '0 8px 20px -6px rgba(201,162,39,.7), inset 0 1px 0 rgba(255,255,255,.5)',
              }}
            >
              G
            </span>
            <span>
              <span className="block text-lg font-extrabold leading-tight tracking-tight text-white">
                GulfLink <span className="gold-text">Overseas</span>
              </span>
              <span className="block text-[11px] font-medium text-gold-300">
                {t('licenseLabel')} {t('licenseValue')}
              </span>
            </span>
          </Link>
          <nav className="ml-auto flex flex-wrap items-center gap-1" aria-label="Main navigation">
            {links.map((l) => {
              const active =
                !l.anchor &&
                (pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-gold-500 font-bold text-navy-950 shadow-[0_6px_16px_-6px_rgba(201,162,39,.8)]'
                      : 'text-navy-100/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/jobs" className="btn-gold ml-2 hidden px-5 py-2.5 text-sm sm:inline-flex">
              {t('ctaFindJobs')} <span aria-hidden>→</span>
            </Link>
          </nav>
          <Link href="/jobs" className="btn-gold ml-auto px-5 py-2.5 text-sm sm:hidden">
            {t('ctaFindJobs')} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
