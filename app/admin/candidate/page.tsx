'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLang } from '../../../lib/i18n';
import AdminGate from '../../../components/AdminGate';
import { getCandidates, updateCandidate } from '../../../lib/store';
import { DOC_KEYS, uid, todayISO, type Candidate, type DocStatus } from '../../../lib/data';

export default function CandidatePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-16 text-center text-navy-700">…</div>}>
      <AdminGate>
        <CandidateDetail />
      </AdminGate>
    </Suspense>
  );
}

const DOC_ORDER: DocStatus[] = ['pending', 'uploaded', 'verified'];

function CandidateDetail() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const [candidate, setCandidate] = useState<Candidate | null | undefined>(undefined);
  const [note, setNote] = useState('');
  const [rLabel, setRLabel] = useState('');
  const [rAmount, setRAmount] = useState('');

  const refresh = () => {
    const c = getCandidates().find((x) => x.id === id) ?? null;
    setCandidate(c);
  };

  useEffect(refresh, [id]);

  if (candidate === undefined) {
    return <div className="mx-auto max-w-4xl px-4 py-16 text-center text-navy-700">…</div>;
  }
  if (candidate === null) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-navy-700">Candidate not found.</p>
        <Link href="/admin" className="mt-4 inline-block text-sm font-semibold text-navy-900 underline">
          ← {t('backToKanban')}
        </Link>
      </div>
    );
  }

  const stageKey = `stage_${candidate.stage.replace('-', '_')}`;

  const cycleDoc = (k: (typeof DOC_KEYS)[number]) => {
    const cur = candidate.documents[k];
    const next = DOC_ORDER[(DOC_ORDER.indexOf(cur) + 1) % DOC_ORDER.length];
    updateCandidate(candidate.id, { documents: { ...candidate.documents, [k]: next } });
    refresh();
  };

  const addNote = () => {
    const text = note.trim();
    if (!text) return;
    updateCandidate(candidate.id, { notes: [...candidate.notes, { ts: todayISO(), text }] });
    setNote('');
    refresh();
  };

  const addReceipt = () => {
    const label = rLabel.trim();
    const amount = Number(rAmount);
    if (!label || !amount) return;
    updateCandidate(candidate.id, {
      receipts: [...candidate.receipts, { id: uid('R'), label, amount, date: todayISO() }],
    });
    setRLabel('');
    setRAmount('');
    refresh();
  };

  const docDot: Record<DocStatus, string> = {
    pending: 'bg-gray-300',
    uploaded: 'bg-gold-500',
    verified: 'bg-green-500',
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12">
      <Link href="/admin" className="mt-4 inline-block text-sm font-medium text-navy-700 hover:text-navy-900">
        ← {t('backToKanban')}
      </Link>

      <div className="mt-3 rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">{candidate.name}</h1>
            <p className="mt-1 text-sm text-navy-100/80">
              {t('personalInfo')}: {candidate.phone} · CNIC ••••{candidate.cnic.slice(-4)}
            </p>
          </div>
          <span className="rounded-full bg-gold-500 px-4 py-1.5 text-sm font-bold text-navy-950">{t(stageKey)}</span>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            [t('tradeLabel'), candidate.trade],
            [t('countryLabel'), candidate.country],
            [t('appliedOn'), candidate.appliedDate],
            [t('passportLabel'), candidate.passport ? t('yes') : t('no')],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-lg bg-white/5 p-3">
              <dt className="text-xs text-navy-100/70">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Documents */}
      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
        <h2 className="text-lg font-bold text-navy-900">{t('docsTitle')}</h2>
        <ul className="mt-4 divide-y divide-navy-50">
          {DOC_KEYS.map((k) => (
            <li key={k} className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3 text-sm text-navy-900">
                <span className={`h-3 w-3 rounded-full ${docDot[candidate.documents[k]]}`} aria-hidden />
                {t(`doc_${k}`)}
              </span>
              <button
                onClick={() => cycleDoc(k)}
                className="rounded-lg bg-navy-50 px-4 py-1.5 text-xs font-bold text-navy-900 ring-1 ring-navy-100 hover:bg-gold-200"
              >
                {t(`status_${candidate.documents[k]}`)}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Notes */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
          <h2 className="text-lg font-bold text-navy-900">{t('notesTitle')}</h2>
          <ul className="mt-3 space-y-2">
            {candidate.notes.length === 0 && <li className="text-sm text-navy-500">{t('noNotes')}</li>}
            {candidate.notes.map((n, i) => (
              <li key={i} className="rounded-lg bg-navy-50 p-3 text-sm text-navy-900">
                <span className="block text-[11px] font-semibold text-navy-500">{n.ts}</span>
                {n.text}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('notePlaceholder')}
              className="min-w-0 flex-1 rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button onClick={addNote} className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
              {t('addNote')}
            </button>
          </div>
        </section>

        {/* Receipts */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
          <h2 className="text-lg font-bold text-navy-900">{t('receiptsTitle')}</h2>
          <ul className="mt-3 space-y-2">
            {candidate.receipts.length === 0 && <li className="text-sm text-navy-500">{t('noReceipts')}</li>}
            {candidate.receipts.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg bg-navy-50 p-3 text-sm">
                <span className="text-navy-900">
                  <span className="font-semibold">{r.label}</span>
                  <span className="block text-[11px] text-navy-500">{r.id} · {r.date}</span>
                </span>
                <span className="font-bold text-navy-900">PKR {r.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <input
              value={rLabel}
              onChange={(e) => setRLabel(e.target.value)}
              placeholder={t('receiptLabelPh')}
              className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-400"
            />
            <div className="flex gap-2">
              <input
                value={rAmount}
                onChange={(e) => setRAmount(e.target.value)}
                placeholder={t('receiptAmountPh')}
                inputMode="numeric"
                className="min-w-0 flex-1 rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button onClick={addReceipt} className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">
                {t('addReceipt')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
