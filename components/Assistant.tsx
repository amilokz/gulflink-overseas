'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang, type Lang } from '../lib/i18n';

interface Msg {
  from: 'bot' | 'user';
  text: string;
}

interface Rule {
  keys: string[];
  en: string;
  ur: string;
}

const RULES: Rule[] = [
  {
    keys: ['salam', 'assalam', 'hello', 'hi ', 'hey', 'aoa', 'adab'],
    en: 'Walaikum Assalam! Main GulfLink ka assistant hoon. Jobs, fees, license ya apply karne ke baare mein poochein.',
    ur: 'Walaikum Assalam! Main GulfLink ka assistant hoon. Jobs, fees, license ya apply karne ke baare mein poochein.',
  },
  {
    keys: ['job', 'naukri', 'kaam', 'vacancy', 'driver', 'electrician', 'plumber', 'welder', 'mason', 'cook'],
    en: 'We have jobs in Saudi Arabia, UAE and Qatar — Electrician, Driver, Plumber, Welder, Mason and Cook. Open the Jobs page to filter by country and trade.',
    ur: 'Saudi Arabia, UAE aur Qatar mein jobs hain — Electrician, Driver, Plumber, Welder, Mason aur Cook. Jobs page par country aur trade ke hisaab se dekhein.',
  },
  {
    keys: ['fee', 'fees', 'paisa', 'paisay', 'charge', 'cost', 'qemat', 'rate'],
    en: 'Registration 25,000 PKR, skill test 5,000, medical 9,500, visa 12,000, protector 7,000. Air ticket is paid by the employer. Full table is on the Fees page — and you always get a receipt.',
    ur: 'Registration 25,000 PKR, skill test 5,000, medical 9,500, visa 12,000, protector 7,000. Air ticket employer deta hai. Poori table Fees page par hai — aur har payment ki receipt milti hai.',
  },
  {
    keys: ['license', 'licence', 'permit', 'permission'],
    en: 'Our sample license number is GL-2024-0813. Every job card also shows its own permission number so you can verify the demand.',
    ur: 'Hamara sample license number GL-2024-0813 hai. Har job card par us ka apna permission number bhi likha hota hai taake aap demand verify kar saken.',
  },
  {
    keys: ['apply', 'darkhwast', 'form', 'kaise', 'how'],
    en: 'Open any job, click "View details & apply", and fill the form: name, CNIC, phone, trade, experience. Your case then appears in our CRM at the Applied stage.',
    ur: 'Koi bhi job kholein, "View details & apply" par click karein aur form bharein: naam, CNIC, phone, trade, tajurba. Aap ka case CRM mein Applied stage par aa jayega.',
  },
  {
    keys: ['track', 'status', 'stage', 'case', 'kahan'],
    en: 'On the Track page, enter your phone number and the last 4 digits of your CNIC to see your current stage and next step.',
    ur: 'Track page par apna phone number aur CNIC ke aakhri 4 digits likhein — apna stage aur agla step dekh saken ge.',
  },
  {
    keys: ['medical'],
    en: 'Medical is done at an approved centre after the skill test — fee 9,500 PKR. We send you the token.',
    ur: 'Skill test ke baad approved centre se medical hota hai — fee 9,500 PKR. Hum aap ko token bhejte hain.',
  },
  {
    keys: ['visa'],
    en: 'Visa processing takes about 2–4 weeks after a clear medical. Keep your passport ready.',
    ur: 'Clear medical ke baad visa processing mein taqreeban 2–4 haftay lagte hain. Passport tayyar rakhein.',
  },
  {
    keys: ['protector'],
    en: 'Protector registration is mandatory before departure — fee 7,000 PKR. You visit our office with documents and receipts.',
    ur: 'Rawangi se pehle protector registration lazmi hai — fee 7,000 PKR. Documents aur receipts ke saath office aein.',
  },
  {
    keys: ['payment', 'personal account', 'fraud', 'dhoka', 'trust', 'bharosa', 'aitmad', 'aitbar'],
    en: 'Hum kabhi personal account mein payment nahi mangte. Har fee ki receipt milti hai. Extra paisay mange to foran office call karein.',
    ur: 'Hum kabhi personal account mein payment nahi mangte. Har fee ki receipt milti hai. Extra paisay mange to foran office call karein.',
  },
  {
    keys: ['address', 'office', 'location', 'kahan', 'pata', 'timing', 'time'],
    en: 'Office: Al-Karim Plaza, Chandni Chowk, Rawalpindi. Timings: Mon–Sat, 9am–6pm.',
    ur: 'Office: Al-Karim Plaza, Chandni Chowk, Rawalpindi. Timing: Peer–Hafta, subah 9–shaam 6.',
  },
  {
    keys: ['shukriya', 'thanks', 'thank', 'meherbani'],
    en: 'Khush aamdeed! Aur koi sawal ho to poochein.',
    ur: 'Khush aamdeed! Aur koi sawal ho to poochein.',
  },
];

const FALLBACK: Record<Lang, string> = {
  en: 'Sorry, I did not understand that. Try asking about jobs, fees, license, apply or tracking.',
  ur: 'Maazrat, main samjha nahi. Jobs, fees, license, apply ya tracking ke baare mein poochein.',
};

function scriptedReply(input: string, lang: Lang): string {
  const q = ` ${input.toLowerCase()} `;
  for (const r of RULES) {
    if (r.keys.some((k) => q.includes(k))) return r[lang];
  }
  return FALLBACK[lang];
}

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export default function Assistant() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: t('asstWelcome') }]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const speak = (text: string) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
      synth.speak(u);
    } catch {}
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const reply = scriptedReply(clean, lang);
    setMsgs((m) => [...m, { from: 'user', text: clean }, { from: 'bot', text: reply }]);
    setInput('');
    speak(reply);
  };

  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceNote(t('voiceUnsupported'));
      return;
    }
    try {
      const rec = new SR();
      rec.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
      rec.interimResults = false;
      setListening(true);
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript as string;
        setListening(false);
        send(transcript);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      rec.start();
    } catch {
      setListening(false);
      setVoiceNote(t('voiceUnsupported'));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[330px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: '0 32px 70px -20px rgba(6,15,36,.55)', border: '1px solid rgba(10,31,68,.1)' }}
        >
          <div className="px-4 py-3.5 text-white" style={{ background: 'linear-gradient(135deg, #0a1f44 0%, #173a68 100%)' }}>
            <p className="font-extrabold tracking-tight">{t('asstTitle')}</p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-300 ring-1 ring-gold-500/40">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-400 pulse-soft" />
              {t('aiSimLabel')}
            </p>
          </div>
          <div className="h-72 space-y-2.5 overflow-y-auto bg-navy-50 px-3.5 py-4" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === 'bot'
                    ? 'rounded-tl-md bg-white text-navy-900 shadow-sm ring-1 ring-navy-100'
                    : 'ml-auto rounded-tr-md text-white shadow-sm'
                }`}
                style={m.from === 'user' ? { background: 'linear-gradient(135deg, #10294f, #1f4d88)' } : undefined}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {voiceNote && <p className="bg-gold-100 px-3.5 py-1.5 text-[11px] font-medium text-navy-900">{voiceNote}</p>}
          <form
            className="flex items-center gap-2 border-t border-navy-100 bg-white p-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <button
              type="button"
              onClick={listen}
              aria-label={t('listenBtn')}
              className={`rounded-full p-2.5 transition ${
                listening
                  ? 'animate-pulse bg-red-500 text-white'
                  : 'bg-navy-100 text-navy-900 hover:bg-gold-200'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2z" />
              </svg>
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? t('listening') : t('asstPlaceholder')}
              className="input min-w-0 flex-1 !rounded-full"
              aria-label={t('asstTitle')}
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-navy-950 transition hover:brightness-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #e7cb7c, #c9a227)', boxShadow: '0 8px 18px -8px rgba(201,162,39,.9)' }}
            >
              →
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t('asstTitle')}
        aria-expanded={open}
        className="flex items-center justify-center rounded-full text-gold-300 transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          height: 60,
          width: 60,
          background: 'linear-gradient(135deg, #10294f 0%, #0a1f44 100%)',
          boxShadow: '0 18px 38px -12px rgba(6,15,36,.7), 0 0 0 2px rgba(201,162,39,.55), inset 0 1px 0 rgba(255,255,255,.15)',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.8-.3-4-.9L3 20l1-5.2a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 8.5-8.5h1A8.5 8.5 0 0 1 21 11.5zM8 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      </button>
    </div>
  );
}
