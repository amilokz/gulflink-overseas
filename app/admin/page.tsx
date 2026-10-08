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
    <div className="mx-auto max-w-7xl px-4 pb-10">
      <div className="pt-4">
        <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{t('kanbanTitle')}</h1>
        <p className="mt-1 text-sm text-navy-700">{t('kanbanHint')}</p>
      </div>

      {sent && (
        <div className="mt-4 max-w-xl" role="status">
          <WhatsAppBubble key={sent.key} to={sent.to} text={sent.text} />
        </div>
      )}

      <div className="mt-6 flex gap-4 overflow-x-auto pb-4" role="list" aria-label={t('kanbanTitle')}>
        {STAGES.map((stage) => {
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
              className={`w-64 shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-navy-100 ${dragOver === stage ? 'drop-hint' : ''}`}
              aria-label={t(stageKey(stage))}
            >
              <h2 className="flex items-center justify-between px-1 pb-2 font-bold text-navy-900">
                <span>{t(stageKey(stage))}</span>
                <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-700">{cards.length}</span>
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
                    className="cursor-grab rounded-xl border border-navy-100 bg-navy-50 p-3 active:cursor-grabbing"
                  >
                    <p className="font-bold text-navy-900">{c.name}</p>
                    <p className="text-xs text-navy-700">
                      {c.trade} → {c.country}
                    </p>
                    <p className="text-xs text-navy-600">{c.phone}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Link
                        href={`/admin/candidate?id=${encodeURIComponent(c.id)}`}
                        className="rounded-md bg-navy-900 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-800"
                      >
                        {t('viewCandidate')}
                      </Link>
                      <div className="flex gap-1">
                        <button
                          onClick={() => moveStep(c, -1)}
                          disabled={stageIndex(c.stage) === 0}
                          aria-label={t('moveLeft')}
                          className="rounded-md bg-white px-2 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => moveStep(c, 1)}
                          disabled={stageIndex(c.stage) === STAGES.length - 1}
                          aria-label={t('moveRight')}
                          className="rounded-md bg-white px-2 py-1 text-sm font-bold text-navy-900 ring-1 ring-navy-200 disabled:opacity-30"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                {cards.length === 0 && <p className="px-1 py-4 text-center text-xs text-navy-400">—</p>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
