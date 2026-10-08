import seedCandidates from '../data/candidates.json';
import seedEmployers from '../data/employers.json';
import type { Candidate, EmployerDemand } from './data';

export const LS_CANDIDATES = 'gulflink-candidates';
export const LS_EMPLOYERS = 'gulflink-employers';
export const LS_ADMIN = 'gulflink-admin';

function readLS<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeLS(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ---------- Candidates ----------
export function getCandidates(): Candidate[] {
  if (typeof window === 'undefined') return seedCandidates as Candidate[];
  const saved = readLS<Candidate[]>(LS_CANDIDATES);
  if (saved) return saved;
  const seed = seedCandidates as Candidate[];
  writeLS(LS_CANDIDATES, seed);
  return seed;
}

export function saveCandidates(list: Candidate[]): void {
  if (typeof window === 'undefined') return;
  writeLS(LS_CANDIDATES, list);
}

export function findCandidateByPhoneCnic(phone: string, cnic4: string): Candidate | null {
  const norm = (s: string) => s.replace(/[\s-]/g, '');
  const p = norm(phone);
  const c4 = cnic4.trim().slice(-4);
  const list = getCandidates();
  return (
    list.find((c) => norm(c.phone) === p && norm(c.cnic).slice(-4) === c4) ?? null
  );
}

export function addCandidate(c: Candidate): Candidate[] {
  const list = getCandidates();
  list.unshift(c);
  saveCandidates(list);
  return list;
}

export function updateCandidate(id: string, patch: Partial<Candidate>): Candidate[] {
  const list = getCandidates().map((c) => (c.id === id ? { ...c, ...patch } : c));
  saveCandidates(list);
  return list;
}

// ---------- Employers ----------
export function getEmployers(): EmployerDemand[] {
  if (typeof window === 'undefined') return seedEmployers as EmployerDemand[];
  const saved = readLS<EmployerDemand[]>(LS_EMPLOYERS);
  if (saved) return saved;
  const seed = seedEmployers as EmployerDemand[];
  writeLS(LS_EMPLOYERS, seed);
  return seed;
}

export function saveEmployers(list: EmployerDemand[]): void {
  if (typeof window === 'undefined') return;
  writeLS(LS_EMPLOYERS, list);
}

// ---------- Admin session ----------
export function isAdmin(): boolean {
  try {
    return window.localStorage.getItem(LS_ADMIN) === '1';
  } catch {
    return false;
  }
}

export function loginAdmin(): void {
  try {
    window.localStorage.setItem(LS_ADMIN, '1');
  } catch {}
}

export function logoutAdmin(): void {
  try {
    window.localStorage.removeItem(LS_ADMIN);
  } catch {}
}

// ---------- Reset ----------
export function resetDemo(): void {
  try {
    window.localStorage.removeItem(LS_CANDIDATES);
    window.localStorage.removeItem(LS_EMPLOYERS);
    // keep admin session + language choice
  } catch {}
}
