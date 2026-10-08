'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '../../lib/i18n';
import AdminGate from '../../components/AdminGate';
import WhatsAppBubble from '../../components/WhatsAppBubble';
import { getCandidates, updateCandidate } from '../../lib/store';
import { STAGES, stageIndex, type Candidate, type Stage } from '../../lib/data';

interface SentMsg {
  to: string;
  text: string;
  key: number;
}

function waMessage(name: string, stageKey: string, t: (k: string) => string): string {
  return `Assalam o Alaikum ${name}! GulfLink Overseas Employment ki taraf se update: aap ka case ab "${t(stageKey)}" stage par hai. ${t(`next_${stageKey.replace('stage_', '')}`)}`;
}

export default function AdminKanbanPage() {
  return (
    <AdminGate>
      <KanbanBoard />
    </AdminGate>
  );
}

function KanbanBoard() {
  const { t } = useLang();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sent, setSent] = useState<SentMsg | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  useEffect(() => {
    setCandidates(getCandidates());
  }, []);

  const stageKey = (s: Stage) => `stage_${s.replace('-', '_')}`;

  const moveTo = (c: Candidate, stage: Stage) => {
    if (c.stage === stage) return;
    setCandidates(updateCandidate(c.id, { stage }));
    setSent({ to: c.phone, text: waMessage(c.name, stageKey(stage), t), key: Date.now() });
  };

  const moveStep = (c: Candidate, dir: 1 | -1) => {
    const i = stageIndex(c.stage) + dir;
    if (i < 0 || i >= STAGES.length) return;
    moveTo(c, STAGES[i]);
  };

  const onDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData('text/plain');
    const c = candidates.find((x) => x.id === id);
    if (c) moveTo(c, stage);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12">
      <div className="pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{t('navAdmin')}</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">{t('kanbanTitle')}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-navy-600">{t('kanbanHint')}</p>
      </div>

      {sent && (
        <div className="mt-5 max-w-xl" role="status">
          <WhatsAppBubble key={sent.key} to={sent.to} text={sent.text} />
        </div>
      )}

      <div className="kanban-scroll mt-6 flex gap-4 overflow-x-auto pb-4" role="list" aria-label={t('kanbanTitle')}>
        {STAGES.map((stage, si) => {
          const cards = candidates.filter((c) => c.stage === stage);
          return (
            <section
              key={stage}
              role="listitem"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(stage);
              }}
              onDragLeave={() => setDragOver((d) => (d === stage ? null : d))}
              onDrop={(e) => onDrop(e, stage)}
              aria-label={t(stageKey(stage))}
              className={`w-72 shrink-0 rounded-2xl p-3 transition-all duration-200 ${
                dragOver === stage ? 'drop-hint' : 'bg-white ring-1 ring-navy-100'
              }`}
              style={dragOver === stage ? undefined : { boxShadow: '0 14px 34px -24px rgba(10,31,68,.3)' }}
            >
              <h2 className="flex items-center justify-between px-1.5 pb-2.5">
                <span className="flex items-center gap-2 text-sm font-extrabold text-navy-900">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-black text-navy-950"
                    style={{ background: 'linear-gradient(135deg, #e7cb7c, #c9a227)' }}
                  >
                    {si + 1}
                  </span>
                  {t(stageKey(stage))}
                </span>
                <span className="rounded-full bg-navy-900 px-2.5 py-0.5 text-xs font-bold text-gold-300">
                  {cards.length}
                </span>
              </h2>
              <div className="space-y-3">
                {cards.map((c) => (
                  <article
                    key={c.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', c.id);
                      e.currentTarget.classList.add('dragging');
                    }}
                    onDragEnd={(e) => e.currentTarget.classList.remove('dragging')}
                    className="cursor-grab rounded-xl border border-navy-100 bg-navy-50 p-3.5 transition-shadow hover:shadow-md active:cursor-grabbing"
                    style={{ borderTop: '3px solid #c9a227' }}
                  >
                    <p className="font-extrabold text-navy-900">{c.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-navy-700">
                      {c.trade} → {c.country}
                    </p>
                    <p className="text-xs text-navy-500">{c.phone}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Link
                        href={`/admin/candidate?id=${encodeURIComponent(c.id)}`}
                        className="rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-navy-700"
                      >
                        {t('viewCandidate')}
                      </Link>
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveStep(c, -1)}
                          disabled={stageIndex(c.stage) === 0}
                          aria-label={t('moveLeft')}
                          className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 transition hover:ring-gold-400 disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => moveStep(c, 1)}
                          disabled={stageIndex(c.stage) === STAGES.length - 1}
                          aria-label={t('moveRight')}
                          className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 transition hover:ring-gold-400 disabled:opacity-30"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {cards.length === 0 && (
                  <p className="rounded-xl border border-dashed border-navy-200 px-1 py-6 text-center text-xs font-medium text-navy-400">
                    —
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
