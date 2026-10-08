'use client';

import { useLang } from '../lib/i18n';

// Mock WhatsApp-style message card used wherever a message is "sent" in the demo.
export default function WhatsAppBubble({ to, text }: { to: string; text: string }) {
  const { t } = useLang();
  return (
    <div className="rounded-xl border border-green-200 bg-[#dcf8c6] p-3 shadow-sm" dir="auto">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-green-900/70">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z" />
        </svg>
        {t('whatsappUpdateLabel')} · {t('sentSim')}
      </div>
      <p className="mt-2 text-sm text-green-950">
        <span className="font-semibold">{to}:</span> {text}
      </p>
    </div>
  );
}
