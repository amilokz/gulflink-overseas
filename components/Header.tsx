'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../lib/i18n';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('navHome') },
    { href: '/jobs', label: t('navJobs') },
    { href: '/track', label: t('navTrack') },
    { href: '/fees', label: t('navFees') },
    { href: '/admin', label: t('navAdmin') },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy-950 text-navy-100 text-xs">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between">
          <a
            href="https://akclnt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-300 hover:text-gold-200 underline underline-offset-2"
          >
            {t('moreDemos')}
          </a>
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded ${lang === 'en' ? 'bg-gold-500 text-navy-950 font-semibold' : 'hover:text-gold-200'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ur')}
              className={`px-2 py-0.5 rounded ${lang === 'ur' ? 'bg-gold-500 text-navy-950 font-semibold' : 'hover:text-gold-200'}`}
            >
              رومن اردو
            </button>
          </div>
        </div>
      </div>

      <div className="bg-navy-900 text-white shadow-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/" className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-navy-950 font-extrabold text-lg"
            >
              G
            </span>
            <span>
              <span className="block font-bold leading-tight">{t('brandName')}</span>
              <span className="block text-[11px] text-gold-300">
                {t('licenseLabel')} {t('licenseValue')}
              </span>
            </span>
          </Link>
          <nav className="ml-auto flex flex-wrap gap-1" aria-label="Main navigation">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    active ? 'bg-gold-500 text-navy-950 font-semibold' : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
