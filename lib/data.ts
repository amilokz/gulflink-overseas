// Stage pipeline order shared by Kanban, tracker and assistant.
export const STAGES = [
  'applied',
  'shortlisted',
  'skill-test',
  'medical',
  'visa',
  'protector',
  'departed',
] as const;

export type Stage = (typeof STAGES)[number];

export const DOC_KEYS = ['passport', 'cnic', 'photos', 'skillTestCert', 'medical', 'visa'] as const;
export type DocKey = (typeof DOC_KEYS)[number];
export type DocStatus = 'pending' | 'uploaded' | 'verified';

export interface Receipt {
  id: string;
  label: string;
  amount: number;
  date: string;
}

export interface Note {
  ts: string;
  text: string;
}

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  cnic: string;
  trade: string;
  country: string;
  jobId?: string;
  experience?: string;
  passport?: boolean;
  skillTest?: string;
  appliedDate: string;
  departureDate?: string;
  stage: Stage;
  documents: Record<DocKey, DocStatus>;
  notes: Note[];
  receipts: Receipt[];
  files?: Record<string, string>; // mock upload: field -> file name
}

export interface EmployerDemand {
  id: string;
  employer: string;
  country: string;
  trade: string;
  requested: number;
  filled: number;
  deadline: string;
}

export interface Job {
  id: string;
  title: string;
  trade: string;
  country: string;
  employer: string;
  salaryLocal: number;
  salaryPkr: number;
  currency: string;
  dutyHours: string;
  food: string;
  accommodation: string;
  contractLength: string;
  vacancies: number;
  permissionNo: string;
  description: string;
}

export interface Fee {
  fee: string;
  amount: number;
  purpose: string;
}

export const stageIndex = (s: Stage): number => STAGES.indexOf(s);

export const uid = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const todayISO = (): string => new Date().toISOString().slice(0, 10);
