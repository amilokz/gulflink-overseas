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
    pending: 'bg-navy-200',
    uploaded: 'bg-gold-500',
    verified: 'bg-green-500',
  };
  const docPill: Record<DocStatus, string> = {
    pending: 'bg-navy-50 text-navy-600 ring-navy-200',
    uploaded: 'bg-gold-100 text-gold-800 ring-gold-500/40',
    verified: 'bg-green-100 text-green-800 ring-green-200',
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12">
      <Link href="/admin" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition hover:text-navy-900">
        <span aria-hidden>←</span> {t('backToKanban')}
      </Link>

      <div className="panel-navy relative mt-3 overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #c9a227, transparent)' }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{candidate.name}</h1>
            <p className="mt-1.5 text-sm text-navy-100/75">
              {t('personalInfo')}: {candidate.phone} · CNIC ••••{candidate.cnic.slice(-4)}
            </p>
          </div>
          <span className="badge-gold px-4 py-1.5 text-sm">{t(stageKey)}</span>
        </div>
        <dl className="relative mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            [t('tradeLabel'), candidate.trade],
            [t('countryLabel'), candidate.country],
            [t('appliedOn'), candidate.appliedDate],
            [t('passportLabel'), candidate.passport ? t('yes') : t('no')],
          ].map(([k, v]) => (
            <div
              key={k as string}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)' }}
            >
              <dt className="text-xs text-navy-100/65">{k}</dt>
              <dd className="mt-1 font-bold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Documents */}
      <section className="card mt-6 p-6 sm:p-7">
        <h2 className="text-lg font-extrabold tracking-tight text-navy-900">{t('docsTitle')}</h2>
        <ul className="mt-3 divide-y divide-navy-100">
          {DOC_KEYS.map((k) => (
            <li key={k} className="flex items-center justify-between gap-3 py-3.5">
              <span className="flex items-center gap-3 text-sm font-medium text-navy-900">
                <span className={`h-3 w-3 rounded-full ring-2 ring-white ${docDot[candidate.documents[k]]}`} style={{ boxShadow: '0 0 0 1px rgba(10,31,68,.12)' }} aria-hidden />
                {t(`doc_${k}`)}
              </span>
              <button
                onClick={() => cycleDoc(k)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold ring-1 transition hover:brightness-95 ${docPill[candidate.documents[k]]}`}
              >
                {t(`status_${candidate.documents[k]}`)}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Notes */}
        <section className="card p-6">
          <h2 className="text-lg font-extrabold tracking-tight text-navy-900">{t('notesTitle')}</h2>
          <ul className="mt-3 space-y-2.5">
            {candidate.notes.length === 0 && <li className="text-sm text-navy-500">{t('noNotes')}</li>}
            {candidate.notes.map((n, i) => (
              <li key={i} className="rounded-xl bg-navy-50 p-3.5 text-sm text-navy-900 ring-1 ring-navy-100">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-navy-500">{n.ts}</span>
                <span className="mt-0.5 block">{n.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('notePlaceholder')}
              className="input"
            />
            <button onClick={addNote} className="btn-navy shrink-0 px-4 py-2 text-sm">
              {t('addNote')}
            </button>
          </div>
        </section>

        {/* Receipts */}
        <section className="card card-gold-top p-6">
          <h2 className="text-lg font-extrabold tracking-tight text-navy-900">{t('receiptsTitle')}</h2>
          <ul className="mt-3 space-y-2.5">
            {candidate.receipts.length === 0 && <li className="text-sm text-navy-500">{t('noReceipts')}</li>}
            {candidate.receipts.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl bg-gold-50 p-3.5 text-sm ring-1 ring-gold-500/30">
                <span className="text-navy-900">
                  <span className="font-bold">{r.label}</span>
                  <span className="block text-[11px] font-medium text-navy-500">{r.id} · {r.date}</span>
                </span>
                <span className="shrink-0 font-black text-navy-900">PKR {r.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <input
              value={rLabel}
              onChange={(e) => setRLabel(e.target.value)}
              placeholder={t('receiptLabelPh')}
              className="input"
            />
            <div className="flex gap-2">
              <input
                value={rAmount}
                onChange={(e) => setRAmount(e.target.value)}
                placeholder={t('receiptAmountPh')}
                inputMode="numeric"
                className="input"
              />
              <button onClick={addReceipt} className="btn-navy shrink-0 px-4 py-2 text-sm">
                {t('addReceipt')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
