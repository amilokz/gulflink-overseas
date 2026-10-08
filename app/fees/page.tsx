'use client';

import { useLang } from '../../lib/i18n';
import feesData from '../../data/fees.json';

export default function FeesPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navFees')}</p>
      <h1 className="mt-1 text-3xl font-black tracking-tight text-navy-900 sm:text-4xl">{t('feesTitle')}</h1>
      <p className="mt-2 max-w-2xl text-navy-700">{t('feesSubtitle')}</p>

      <div className="card mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-white" style={{ background: 'linear-gradient(135deg, #0a1f44, #173a68)' }}>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gold-300">{t('colFee')}</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gold-300">{t('colAmount')}</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gold-300">{t('colPurpose')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {feesData.map((f) => (
              <tr key={f.fee} className="transition hover:bg-gold-50">
                <td className="px-5 py-4 font-bold text-navy-900">{f.fee}</td>
                <td className="px-5 py-4 font-black text-navy-900">
                  {f.amount === 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 ring-1 ring-green-200">
                      <span aria-hidden>✓</span> {t('employerPaid')}
                    </span>
                  ) : (
                    `PKR ${f.amount.toLocaleString()}`
                  )}
                </td>
                <td className="px-5 py-4 text-navy-700">{f.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="card card-gold-top mt-6 p-6 sm:p-7"
        style={{ background: 'linear-gradient(135deg, #faf3df 0%, #fdfaf0 100%)' }}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-black text-navy-950"
            style={{ background: 'linear-gradient(135deg, #e7cb7c, #c9a227)', boxShadow: '0 8px 18px -8px rgba(201,162,39,.8)' }}
          >
            !
          </span>
          <div>
            <h2 className="font-extrabold text-navy-900">{t('feesNoteTitle')}</h2>
            <p className="mt-2 leading-relaxed text-navy-800">{t('feesNoteBody')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
