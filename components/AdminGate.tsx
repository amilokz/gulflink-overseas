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
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-navy-100">
          <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-300 text-2xl">🔒</span>
          <h1 className="mt-4 text-2xl font-extrabold text-navy-900">{t('loginTitle')}</h1>
          <p className="mt-2 text-sm text-navy-700">{t('loginBody')}</p>
          <button
            onClick={() => {
              loginAdmin();
              setAdmin(true);
            }}
            className="mt-6 w-full rounded-lg bg-gold-500 px-6 py-3 font-bold text-navy-950 hover:bg-gold-400"
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
        <nav className="flex flex-wrap gap-1" aria-label="Admin">
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
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  active ? 'bg-navy-900 text-white' : 'text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2">
          <button
            onClick={doReset}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-navy-700 ring-1 ring-navy-200 hover:bg-navy-50"
          >
            {t('resetDemo')}
          </button>
          <button
            onClick={() => {
              logoutAdmin();
              setAdmin(false);
            }}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-50"
          >
            {t('logoutBtn')}
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
