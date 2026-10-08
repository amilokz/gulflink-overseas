'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '../lib/i18n';
import { isAdmin, loginAdmin, logoutAdmin, resetDemo } from '../lib/store';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  const doReset = () => {
    resetDemo();
    alert(t('resetDone'));
    window.location.reload();
  };

  if (admin === null) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center text-navy-700">…</div>;
  }

  if (!admin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="card card-gold-top p-8 text-center sm:p-10">
          <span
            aria-hidden
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: 'linear-gradient(135deg, #0a1f44, #173a68)', boxShadow: '0 14px 28px -12px rgba(10,31,68,.7)' }}
          >
            🔒
          </span>
          <h1 className="mt-5 text-2xl font-black tracking-tight text-navy-900">{t('loginTitle')}</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-navy-600">{t('loginBody')}</p>
          <button
            onClick={() => {
              loginAdmin();
              setAdmin(true);
            }}
            className="btn-gold mt-7 w-full px-6 py-3.5"
          >
            {t('loginBtn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pt-6">
        <nav className="flex flex-wrap gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-navy-100" style={{ boxShadow: '0 10px 26px -20px rgba(10,31,68,.35)' }} aria-label="Admin">
          {[
            { href: '/admin', label: t('kanbanTitle') },
            { href: '/admin/employers', label: t('empTitle') },
            { href: '/admin/reports', label: t('repTitle') },
          ].map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-navy-900 font-bold text-gold-300 shadow-md'
                    : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2">
          <button onClick={doReset} className="btn-outline px-4 py-2 text-sm">
            {t('resetDemo')}
          </button>
          <button onClick={() => { logoutAdmin(); setAdmin(false); }} className="btn-danger-outline px-4 py-2 text-sm">
            {t('logoutBtn')}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
