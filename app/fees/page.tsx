'use client';

import { useLang } from '../../lib/i18n';
import feesData from '../../data/fees.json';

export default function FeesPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy-900">{t('feesTitle')}</h1>
      <p className="mt-2 max-w-2xl text-navy-700">{t('feesSubtitle')}</p>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-100">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-navy-900 text-white">
              <th className="px-4 py-3 font-semibold">{t('colFee')}</th>
              <th className="px-4 py-3 font-semibold">{t('colAmount')}</th>
              <th className="px-4 py-3 font-semibold">{t('colPurpose')}</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((f, i) => (
              <tr key={f.fee} className={i % 2 === 0 ? 'bg-white' : 'bg-navy-50'}>
                <td className="px-4 py-3 font-semibold text-navy-900">{f.fee}</td>
                <td className="px-4 py-3 font-bold text-navy-900">
                  {f.amount === 0 ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">{t('employerPaid')}</span>
                  ) : (
                    `PKR ${f.amount.toLocaleString()}`
                  )}
                </td>
                <td className="px-4 py-3 text-navy-700">{f.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl bg-gold-100 p-6 ring-1 ring-gold-500/40">
        <h2 className="font-bold text-navy-900">{t('feesNoteTitle')}</h2>
        <p className="mt-2 text-navy-900">{t('feesNoteBody')}</p>
      </div>
    </div>
  );
}
