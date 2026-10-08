'use client';

import { useLang } from '../lib/i18n';

// Mock WhatsApp-style message card used wherever a message is "sent" in the demo.
export default function WhatsAppBubble({ to, text }: { to: string; text: string }) {
  const { t } = useLang();
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4"
      dir="auto"
      style={{
        background: 'linear-gradient(135deg, #dcf8c6 0%, #c8f0b4 100%)',
        border: '1px solid #a8d88f',
        boxShadow: '0 14px 30px -18px rgba(37,211,102,.55), inset 0 1px 0 rgba(255,255,255,.6)',
      }}
    >
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-green-900/70">
        <span
          aria-hidden
          className="flex h-5 w-5 items-center justify-center rounded-full text-white"
          style={{ background: '#25D366' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z" />
          </svg>
        </span>
        {t('whatsappUpdateLabel')} · {t('sentSim')}
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-green-950">
        <span className="font-bold">{to}:</span> {text}
      </p>
      <p className="mt-1.5 text-right text-[10px] font-semibold text-green-800/70">
        ✓✓ {t('sentSim')}
      </p>
    </div>
  );
}
