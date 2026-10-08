'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'ur';

type Str = { en: string; ur: string };

export const STRINGS: Record<string, Str> = {
  // ---- global ----
  brandName: { en: 'GulfLink Overseas Employment', ur: 'GulfLink Overseas Employment' },
  moreDemos: { en: '← More demos by AKCLNT', ur: '← AKCLNT ki mazeed demos' },
  demoNote: { en: 'Demo — sample data. Built by AKCLNT.', ur: 'Demo — sample data. AKCLNT ne banaya.' },
  buildForBusiness: { en: 'Build this for your business', ur: 'Apne business ke liye ye banwain' },
  navHome: { en: 'Home', ur: 'Home' },
  navJobs: { en: 'Jobs', ur: 'Jobs' },
  navTrack: { en: 'Track Application', ur: 'Application Track karein' },
  navFees: { en: 'Fees', ur: 'Fees' },
  navAdmin: { en: 'Admin', ur: 'Admin' },
  licenseLabel: { en: 'License No.', ur: 'License No.' },
  licenseValue: { en: 'GL-2024-0813 (sample)', ur: 'GL-2024-0813 (sample)' },
  addressLabel: { en: 'Office', ur: 'Office' },
  addressValue: {
    en: 'Office #12, 2nd Floor, Al-Karim Plaza, Chandni Chowk, Rawalpindi',
    ur: 'Office #12, 2nd Floor, Al-Karim Plaza, Chandni Chowk, Rawalpindi',
  },
  yes: { en: 'Yes', ur: 'Ji haan' },
  no: { en: 'No', ur: 'Nahi' },
  back: { en: 'Back', ur: 'Wapas' },
  resetDemo: { en: 'Reset demo data', ur: 'Demo data reset karein' },
  resetDone: { en: 'Demo data has been reset to sample data.', ur: 'Demo data wapas sample data par aa gaya.' },
  all: { en: 'All', ur: 'Sab' },

  // ---- home ----
  heroTitle: { en: 'Trusted overseas jobs for Pakistani workers', ur: 'Pakistani workers ke liye bharosemand overseas jobs' },
  heroProblem: {
    en: 'Overseas recruitment usually runs on paper registers and WhatsApp — candidates lose trust and track of their case. GulfLink puts every job, fee and case stage online.',
    ur: 'Overseas recruitment aam tor par register aur WhatsApp par chalti hai — candidates ka aitmad toot jata hai. GulfLink har job, fee aur case ka stage online dikhata hai.',
  },
  ctaBrowseJobs: { en: 'Browse jobs', ur: 'Jobs dekhein' },
  ctaTrack: { en: 'Track your application', ur: 'Apni application track karein' },
  trustTitle: { en: 'Our trust promise', ur: 'Hamara aitmad ka waada' },
  trustBody: {
    en: 'Hum kabhi personal account mein payment nahi mangte. Har fee ki receipt milti hai.',
    ur: 'Hum kabhi personal account mein payment nahi mangte. Har fee ki receipt milti hai.',
  },
  howTitle: { en: 'How it works', ur: 'Ye kaise kaam karta hai' },
  step1T: { en: '1. Find a job', ur: '1. Job talash karein' },
  step1D: { en: 'Browse verified jobs by country and trade, with salary and contract details.', ur: 'Country aur trade ke hisaab se verified jobs dekhein — salary aur contract details ke saath.' },
  step2T: { en: '2. Apply online', ur: '2. Online apply karein' },
  step2D: { en: 'Fill one simple form — name, CNIC, phone, trade and experience.', ur: 'Aik simple form bharein — naam, CNIC, phone, trade aur tajurba.' },
  step3T: { en: '3. Track your case', ur: '3. Apna case track karein' },
  step3D: { en: 'Enter your phone and last 4 CNIC digits to see your stage and next step.', ur: 'Apna phone aur CNIC ke aakhri 4 digits likhein — apna stage aur agla step dekhein.' },
  step4T: { en: '4. Fly with receipts', ur: '4. Receipt ke saath rawana' },
  step4D: { en: 'Every fee has a receipt. No personal-account payments, ever.', ur: 'Har fee ki receipt milti hai. Personal account mein payment kabhi nahi.' },
  statJobs: { en: 'Active jobs', ur: 'Active jobs' },
  statCandidates: { en: 'Workers placed (sample)', ur: 'Bhaije gaye workers (sample)' },
  statEmployers: { en: 'Employer demands', ur: 'Employer demands' },
  sampleNote: { en: 'All names, license numbers and figures are fictional sample data.', ur: 'Tamam naam, license numbers aur figures fictional sample data hain.' },

  // ---- jobs ----
  jobsTitle: { en: 'Available jobs', ur: 'Dastiyab jobs' },
  jobsSubtitle: {
    en: 'Filter by country and trade. Every job shows salary, hours, food, accommodation and contract length.',
    ur: 'Country aur trade ke hisaab se filter karein. Har job mein salary, duty hours, khana, rehaish aur contract likha hai.',
  },
  filterCountry: { en: 'Country', ur: 'Country' },
  filterTrade: { en: 'Trade', ur: 'Trade' },
  salaryLabel: { en: 'Salary', ur: 'Salary' },
  perMonth: { en: '/month', ur: '/mahina' },
  dutyLabel: { en: 'Duty', ur: 'Duty' },
  foodLabel: { en: 'Food', ur: 'Khana' },
  accomLabel: { en: 'Accommodation', ur: 'Rehaish' },
  contractLabel: { en: 'Contract', ur: 'Contract' },
  vacanciesLabel: { en: 'Vacancies', ur: 'Vacancies' },
  permNoLabel: { en: 'Permission No.', ur: 'Permission No.' },
  permSample: { en: '(sample)', ur: '(sample)' },
  viewDetails: { en: 'View details & apply', ur: 'Details dekhein aur apply karein' },
  noJobs: { en: 'No jobs match these filters.', ur: 'In filters se koi job nahi mili.' },

  // ---- job detail / apply ----
  backToJobs: { en: 'Back to jobs', ur: 'Jobs par wapas' },
  jobDetails: { en: 'Job details', ur: 'Job ki tafseel' },
  applyTitle: { en: 'Apply for this job', ur: 'Is job ke liye apply karein' },
  applySubtitle: {
    en: 'Fill the form below. Your application goes straight to the agency CRM (demo).',
    ur: 'Neeche form bharein. Aap ki application seedha agency ke CRM mein jayegi (demo).',
  },
  nameLabel: { en: 'Full name', ur: 'Poora naam' },
  cnicLabel: { en: 'CNIC number', ur: 'CNIC number' },
  phoneLabel: { en: 'Phone number', ur: 'Phone number' },
  tradeLabel: { en: 'Your trade', ur: 'Aap ka trade' },
  expLabel: { en: 'Experience (years)', ur: 'Tajurba (saal)' },
  passportLabel: { en: 'Do you have a passport?', ur: 'Kya aap ke paas passport hai?' },
  skillTestLabel: { en: 'Skill test status', ur: 'Skill test ka status' },
  skillNotTaken: { en: 'Not taken', ur: 'Nahi diya' },
  skillScheduled: { en: 'Scheduled', ur: 'Scheduled hai' },
  skillPassed: { en: 'Passed', ur: 'Pass ho gaya' },
  skillFailed: { en: 'Failed', ur: 'Fail ho gaya' },
  docsLabel: { en: 'Documents (mock upload)', ur: 'Documents (mock upload)' },
  docsHint: {
    en: 'Files stay on your device — only the file name is saved in this demo.',
    ur: 'Files aap ke device par hi rehti hain — demo mein sirf file ka naam save hota hai.',
  },
  docPassport: { en: 'Passport copy', ur: 'Passport ki copy' },
  docCnic: { en: 'CNIC copy', ur: 'CNIC ki copy' },
  docPhoto: { en: 'Passport-size photo', ur: 'Passport-size photo' },
  docSkill: { en: 'Skill certificate', ur: 'Skill certificate' },
  docMedical: { en: 'Medical report', ur: 'Medical report' },
  chooseFile: { en: 'Choose file', ur: 'File chunein' },
  fileSaved: { en: 'saved (demo)', ur: 'save ho gaya (demo)' },
  submitApplication: { en: 'Submit application', ur: 'Application jama karein' },
  successTitle: { en: 'Application submitted!', ur: 'Application jama ho gayi!' },
  successBody: {
    en: 'Your case is now in the CRM at the "Applied" stage. Use your phone + last 4 CNIC digits to track it.',
    ur: 'Aap ka case CRM mein "Applied" stage par aa gaya. Apne phone + CNIC ke aakhri 4 digits se track karein.',
  },
  trackNow: { en: 'Track my application', ur: 'Apni application track karein' },
  appIdLabel: { en: 'Application ID', ur: 'Application ID' },

  // ---- tracker ----
  trackTitle: { en: 'Track your application', ur: 'Apni application track karein' },
  trackSubtitle: {
    en: 'Enter your phone number and the last 4 digits of your CNIC to see your current stage.',
    ur: 'Apna phone number aur CNIC ke aakhri 4 digits likhein — apna maujooda stage dekhein.',
  },
  cnic4Label: { en: 'Last 4 CNIC digits', ur: 'CNIC ke aakhri 4 digits' },
  checkBtn: { en: 'Check status', ur: 'Status dekhein' },
  demoHint: {
    en: 'Demo: try phone 0300-1112222 with CNIC ending 4321',
    ur: 'Demo: phone 0300-1112222 aur CNIC ending 4321 try karein',
  },
  notFound: {
    en: 'No application found for this phone and CNIC. Please check the numbers.',
    ur: 'Is phone aur CNIC par koi application nahi mili. Numbers dobara check karein.',
  },
  stageLabel: { en: 'Current stage', ur: 'Maujooda stage' },
  nextStepLabel: { en: 'Next step', ur: 'Agla step' },
  appliedOn: { en: 'Applied on', ur: 'Apply ki tareekh' },
  countryLabel: { en: 'Country', ur: 'Country' },
  jobLabel: { en: 'Job', ur: 'Job' },

  // ---- stages ----
  stage_applied: { en: 'Applied', ur: 'Darkhwast jama' },
  stage_shortlisted: { en: 'Shortlisted', ur: 'Shortlist' },
  stage_skill_test: { en: 'Skill Test', ur: 'Skill Test' },
  stage_medical: { en: 'Medical', ur: 'Medical' },
  stage_visa: { en: 'Visa', ur: 'Visa' },
  stage_protector: { en: 'Protector Registration', ur: 'Protector Registration' },
  stage_departed: { en: 'Departed', ur: 'Rawana ho gaye' },
  next_applied: {
    en: 'Our team reviews your documents and shortlists you within 2–3 working days.',
    ur: 'Hamari team aap ke documents check kar ke 2–3 working days mein shortlist karegi.',
  },
  next_shortlisted: {
    en: 'Appear for the skill test at our centre. Bring your original CNIC.',
    ur: 'Hamare centre par skill test dein. Asli CNIC saath laein.',
  },
  next_skill_test: {
    en: 'Complete your medical at the approved medical centre. We will share the token.',
    ur: 'Approved medical centre se medical karwain. Hum token bhej denge.',
  },
  next_medical: {
    en: 'Your visa file is being processed. Keep your passport ready.',
    ur: 'Aap ke visa ki file process ho rahi hai. Passport tayyar rakhein.',
  },
  next_visa: {
    en: 'Visit the office for protector registration with your documents and receipts.',
    ur: 'Protector registration ke liye documents aur receipts ke saath office tashreef laein.',
  },
  next_protector: {
    en: 'Your ticket is being booked. Pack your bags — departure is near!',
    ur: 'Aap ki ticket book ho rahi hai. Bags pack karein — rawangi qareeb hai!',
  },
  next_departed: {
    en: 'You have departed. Safe travels! Our helpline is available for any issue abroad.',
    ur: 'Aap rawana ho chuke hain. Safe travels! Bahar kisi bhi masle ke liye hamari helpline hazir hai.',
  },

  // ---- fees ----
  feesTitle: { en: 'Fee transparency', ur: 'Fees ki mukammal tafseel' },
  feesSubtitle: {
    en: 'Every fee we charge is listed here with its purpose. You always get a receipt — never pay into a personal account.',
    ur: 'Har fee yahan us ke maqsad ke saath likhi hai. Aap ko hamesha receipt milegi — personal account mein kabhi payment na karein.',
  },
  colFee: { en: 'Fee', ur: 'Fee' },
  colAmount: { en: 'Amount', ur: 'Raqam' },
  colPurpose: { en: 'Purpose', ur: 'Maqsad' },
  employerPaid: { en: 'Employer-paid', ur: 'Employer dega' },
  feesNoteTitle: { en: 'Important', ur: 'Zaroori baat' },
  feesNoteBody: {
    en: 'No other charges exist beyond this list. If anyone asks for extra money, call our office number immediately.',
    ur: 'Is list ke ilawa koi aur charge nahi hai. Agar koi extra paisay mange to foran hamare office number par call karein.',
  },

  // ---- admin ----
  loginTitle: { en: 'Admin demo login', ur: 'Admin demo login' },
  loginBody: {
    en: 'This is a simulated login. No real authentication — click below to enter the demo CRM.',
    ur: 'Ye simulated login hai. Koi real authentication nahi — demo CRM mein dakhil hone ke liye neeche click karein.',
  },
  loginBtn: { en: 'Login as demo admin', ur: 'Demo admin ke tor par login' },
  logoutBtn: { en: 'Logout', ur: 'Logout' },
  kanbanTitle: { en: 'Candidate pipeline', ur: 'Candidates ki pipeline' },
  kanbanHint: {
    en: 'Drag a card to a new stage (or use the arrows). A simulated WhatsApp update is shown for the candidate.',
    ur: 'Card ko naye stage par drag karein (ya arrows use karein). Candidate ko simulated WhatsApp update dikhaya jayega.',
  },
  moveLeft: { en: 'Move back', ur: 'Peechay karein' },
  moveRight: { en: 'Move forward', ur: 'Aagay barhain' },
  viewCandidate: { en: 'Open', ur: 'Kholein' },
  whatsappUpdateLabel: { en: 'WhatsApp update (simulated)', ur: 'WhatsApp update (simulated)' },
  sentSim: { en: 'Message sent (simulated)', ur: 'Message bhej diya gaya (simulated)' },
  aiSimLabel: { en: 'AI simulated for demo', ur: 'Demo ke liye AI simulated' },
  empTitle: { en: 'Employer demands', ur: 'Employer demands' },
  empSubtitle: {
    en: 'Live demand vs filled count for each employer order.',
    ur: 'Har employer order ke liye demand aur filled count.',
  },
  colEmployer: { en: 'Employer', ur: 'Employer' },
  colTrade: { en: 'Trade', ur: 'Trade' },
  colFilled: { en: 'Filled / Requested', ur: 'Filled / Requested' },
  colDeadline: { en: 'Deadline', ur: 'Deadline' },
  adjustTitle: { en: 'Adjust filled count (demo)', ur: 'Filled count tabdeel karein (demo)' },
  repTitle: { en: 'Reports', ur: 'Reports' },
  repSubtitle: {
    en: 'Departures and breakdowns from sample CRM data.',
    ur: 'Sample CRM data se departures aur breakdowns.',
  },
  depPerMonth: { en: 'Departures per month', ur: 'Har mahine departures' },
  tradeBreakdown: { en: 'Candidates by trade', ur: 'Trade ke hisaab se candidates' },
  countryBreakdown: { en: 'Candidates by country', ur: 'Country ke hisaab se candidates' },
  departures: { en: 'Departures', ur: 'Departures' },
  candidates: { en: 'Candidates', ur: 'Candidates' },

  // ---- candidate detail ----
  candDetailTitle: { en: 'Candidate file', ur: 'Candidate ki file' },
  backToKanban: { en: 'Back to pipeline', ur: 'Pipeline par wapas' },
  docsTitle: { en: 'Documents checklist', ur: 'Documents checklist' },
  status_pending: { en: 'Pending', ur: 'Pending' },
  status_uploaded: { en: 'Uploaded', ur: 'Upload ho gaya' },
  status_verified: { en: 'Verified', ur: 'Verified' },
  notesTitle: { en: 'Notes', ur: 'Notes' },
  notePlaceholder: { en: 'Write a note…', ur: 'Note likhein…' },
  addNote: { en: 'Add note', ur: 'Note add karein' },
  noNotes: { en: 'No notes yet.', ur: 'Abhi koi notes nahi.' },
  receiptsTitle: { en: 'Receipts', ur: 'Receipts' },
  noReceipts: { en: 'No receipts yet.', ur: 'Abhi koi receipts nahi.' },
  addReceipt: { en: 'Add receipt (demo)', ur: 'Receipt add karein (demo)' },
  receiptLabelPh: { en: 'Label (e.g. Medical fee)', ur: 'Label (masalan Medical fee)' },
  receiptAmountPh: { en: 'Amount (PKR)', ur: 'Raqam (PKR)' },
  personalInfo: { en: 'Personal info', ur: 'Personal info' },
  doc_passport: { en: 'Passport copy', ur: 'Passport ki copy' },
  doc_cnic: { en: 'CNIC copy', ur: 'CNIC ki copy' },
  doc_photos: { en: 'Photos', ur: 'Photos' },
  doc_skillTestCert: { en: 'Skill test certificate', ur: 'Skill test certificate' },
  doc_medical: { en: 'Medical report', ur: 'Medical report' },
  doc_visa: { en: 'Visa', ur: 'Visa' },

  // ---- assistant ----
  asstTitle: { en: 'GulfLink Assistant', ur: 'GulfLink Assistant' },
  asstPlaceholder: { en: 'Ask about jobs, fees, license…', ur: 'Jobs, fees, license ke baare mein poochein…' },
  asstWelcome: {
    en: 'Assalam-o-Alaikum! Ask me about jobs, fees, license or the application process.',
    ur: 'Assalam-o-Alaikum! Jobs, fees, license ya application process ke baare mein poochein.',
  },
  listenBtn: { en: 'Speak', ur: 'Bolein' },
  listening: { en: 'Listening…', ur: 'Sun rahe hain…' },
  voiceUnsupported: {
    en: 'Voice not supported in this browser — text chat works fine.',
    ur: 'Is browser mein voice support nahi — text chat theek kaam karega.',
  },

  // ---- landing (home v2) ----
  navFaq: { en: 'FAQ', ur: 'FAQ' },
  ctaFindJobs: { en: 'Find jobs', ur: 'Jobs talash karein' },
  heroNewTitle: { en: 'Overseas jobs, without the doubt', ur: 'Overseas jobs, bina kisi shak ke' },
  heroNewSub: {
    en: "Agencies run on registers and WhatsApp and candidates don't know who to trust — GulfLink shows every job, every fee and your application stage, openly.",
    ur: 'Agencies register aur WhatsApp par chalti hain aur candidates ko pata nahi hota kisi par aitmad karein — GulfLink har job, har fee aur aap ki application ka stage khullam-khulla dikhata hai.',
  },
  cardTrust1: { en: 'Fee receipt for every rupee', ur: 'Har rupay ki fee receipt' },
  cardTrust2: { en: 'Never pay to a personal account', ur: 'Personal account mein kabhi payment na karein' },
  kanbanCandidate: { en: 'Bilal A. — Driver', ur: 'Bilal A. — Driver' },
  kanbanPipelineTag: { en: 'Sample case', ur: 'Sample case' },
  statsOpenJobs: { en: 'open jobs', ur: 'open jobs' },
  statsCountries: { en: 'countries', ur: 'countries' },
  statsFeeFull: { en: '100% fee transparency', ur: '100% fee transparency' },

  // trust strip
  trustStripTitle: { en: 'Why candidates trust GulfLink', ur: 'Candidates GulfLink par aitmad kyun karte hain' },
  tp1: { en: 'Sample license shown', ur: 'License sample mein dikhayi gayi' },
  tp2: { en: 'No personal-account payments', ur: 'Personal account mein payment nahi' },
  tp3: { en: 'Fee receipts', ur: 'Fee ki receipts' },
  tp4: { en: 'Sample data', ur: 'Sample data' },

  // features
  featuresTitle: { en: 'Everything in one place', ur: 'Sab kuch aik hi jagah' },
  featuresSub: {
    en: 'One website for candidates, one CRM for the agency — fully transparent from job ad to departure.',
    ur: 'Candidates ke liye aik website, agency ke liye aik CRM — job ad se rawangi tak poori shaffafiyat.',
  },
  f1T: { en: 'Verified job listings', ur: 'Verified job listings' },
  f1D: {
    en: 'Every job carries a permission number with full salary, hours, food, accommodation and contract details.',
    ur: 'Har job mein permission number aur poori salary, duty hours, khana, rehaish aur contract ki tafseel hoti hai.',
  },
  f2T: { en: 'Transparent fee table', ur: 'Mukammal fee table' },
  f2D: {
    en: 'Every charge listed with its purpose — plus a printed receipt for every rupee you pay.',
    ur: 'Har charge apne maqsad ke saath listed — aur har rupay ki printed receipt.',
  },
  f3T: { en: 'Application stage tracker', ur: 'Application stage tracker' },
  f3D: {
    en: 'Candidates check their exact stage any time with phone + CNIC. No more guessing.',
    ur: 'Candidates phone + CNIC se kabhi bhi apna exact stage check kar sakte hain. Ab andaza lagane ki zaroorat nahi.',
  },
  f4T: { en: 'Document checklist', ur: 'Documents ki checklist' },
  f4D: {
    en: 'Passport, CNIC, photos, medical — see what is pending, uploaded or verified.',
    ur: 'Passport, CNIC, photos, medical — dekhein kya pending, uploaded ya verified hai.',
  },
  f5T: { en: 'Employer demand board', ur: 'Employer demand board' },
  f5D: {
    en: 'Live view of each employer order: how many workers were requested vs how many are filled.',
    ur: 'Har employer order ka live view: kitne workers chahiye thay, kitne fill ho gaye.',
  },
  f6T: { en: 'Departure reports', ur: 'Departure reports' },
  f6D: {
    en: 'Charts of departures by month, trade and country — for the agency to plan ahead.',
    ur: 'Departures ke charts — mahine, trade aur country ke hisaab se, agency ki planning ke liye.',
  },

  // how it works (3 steps)
  hs1T: { en: 'Browse jobs and apply with documents', ur: 'Jobs dekhein aur documents ke saath apply karein' },
  hs1D: {
    en: 'Pick a verified job from Saudi Arabia, UAE or Qatar and submit one simple form.',
    ur: 'Saudi Arabia, UAE ya Qatar ki verified job chunein aur aik simple form jama karein.',
  },
  hs2T: { en: 'Track your stage any time', ur: 'Apna stage kabhi bhi track karein' },
  hs2D: {
    en: 'Enter your phone + last 4 CNIC digits — see your current stage and the next step.',
    ur: 'Apna phone + CNIC ke aakhri 4 digits likhein — apna maujooda stage aur agla step dekhein.',
  },
  hs3T: { en: 'WhatsApp updates until departure', ur: 'Rawangi tak WhatsApp updates' },
  hs3D: {
    en: 'A simulated WhatsApp update goes out at every stage, all the way to departure.',
    ur: 'Har stage par simulated WhatsApp update milti hai, rawangi tak.',
  },
  hsSub: {
    en: 'Three simple steps — from job ad to boarding the flight.',
    ur: 'Teen simple steps — job ad se flight tak.',
  },

  // demo CTA band
  demoBandTitle: { en: 'See the full demo live', ur: 'Poori demo live dekhein' },
  demoBandBody: {
    en: 'Browse 9 sample jobs, apply in a minute, track a sample case in the CRM — everything runs on sample data.',
    ur: '9 sample jobs dekhein, aik minute mein apply karein, CRM mein sample case track karein — sab kuch sample data par chalta hai.',
  },
  demoBandCta: { en: 'Open the live demo', ur: 'Live demo kholein' },

  // testimonials
  testiTitle: { en: 'Candidates placed abroad', ur: 'Bahar bheje gaye candidates' },
  testiSub: { en: 'Fictional sample quotes written for this demo.', ur: 'Is demo ke liye likhe gaye fictional sample quotes.' },
  testiTag: { en: 'Fictional sample', ur: 'Fictional sample' },
  t1Q: {
    en: '"My family tracked my case on the website every day. The fee receipt came before I paid a single rupee."',
    ur: '"Mere ghar wale roz website par mera case track karte thay. Paisay dene se pehle fee ki receipt mil gayi thi."',
  },
  t1N: { en: 'Rashid K.', ur: 'Rashid K.' },
  t1M: { en: 'Driver — Saudi Arabia (sample)', ur: 'Driver — Saudi Arabia (sample)' },
  t2Q: {
    en: '"From skill test to visa, every step came with a WhatsApp update. No confusion, no agent visits."',
    ur: '"Skill test se visa tak, har step ki WhatsApp update aayi. Koi confusion nahi, agent ke chakar nahi."',
  },
  t2N: { en: 'Farhan M.', ur: 'Farhan M.' },
  t2M: { en: 'Welder — Qatar (sample)', ur: 'Welder — Qatar (sample)' },
  t3Q: {
    en: '"I never paid into anyone\'s personal account. The receipt had the company stamp — that gave me confidence."',
    ur: '"Maine kabhi kisi ke personal account mein payment nahi ki. Receipt par company ki stamp thi — isi se aitmad aaya."',
  },
  t3N: { en: 'Javed S.', ur: 'Javed S.' },
  t3M: { en: 'Electrician — UAE (sample)', ur: 'Electrician — UAE (sample)' },

  // FAQ
  faqTitle: { en: 'Frequently asked questions', ur: 'Aam sawalat' },
  faqSub: { en: 'Clear answers, no fine print.', ur: 'Seedhe jawab, koi chhupi shart nahi.' },
  fq1: { en: 'Is the license real?', ur: 'Kya ye license asli hai?' },
  fa1: {
    en: 'No — every license and permission number on this demo is fictional sample data. A real agency would show its genuine license number here.',
    ur: 'Nahi — is demo mein har license aur permission number fictional sample data hai. Asli agency yahan apna genuine license number dikhayegi.',
  },
  fq2: { en: 'Which countries and trades are covered?', ur: 'Kaun se countries aur trades cover hain?' },
  fa2: {
    en: 'Saudi Arabia, UAE and Qatar, across trades like drivers, electricians, welders, masons and more. The full list is on the jobs page.',
    ur: 'Saudi Arabia, UAE aur Qatar — drivers, electricians, welders, masons jaise trades mein. Poori list jobs page par hai.',
  },
  fq3: { en: 'What fees do I pay?', ur: 'Mujhe kya fees deni hogi?' },
  fa3: {
    en: 'Only the fees listed on the fees page, each with its purpose — and you get a printed receipt for every payment. Never pay into a personal account.',
    ur: 'Sirf wohi fees jo fees page par listed hain, har aik apne maqsad ke saath — aur har payment ki printed receipt milegi. Personal account mein kabhi payment na karein.',
  },
  fq4: { en: 'How do I track my application?', ur: 'Main apni application kaise track karoon?' },
  fa4: {
    en: 'Open the Track page and enter your phone number plus the last 4 digits of your CNIC. You will see your current stage and the next step.',
    ur: 'Track page kholein aur apna phone number + CNIC ke aakhri 4 digits likhein. Aap ko apna maujooda stage aur agla step nazar aayega.',
  },
  fq5: { en: 'How do I get this for my agency?', ur: 'Main apni agency ke liye ye kaise banwaoon?' },
  fa5: {
    en: 'This demo was built by AKCLNT. Click "Build this for your business" below to start a conversation.',
    ur: 'Ye demo AKCLNT ne banayi hai. Neeche "Build this for your business" par click kar ke baat shuru karein.',
  },

  // final CTA
  finalTitle: { en: 'Ready to see every job, every fee, every stage?', ur: 'Har job, har fee, har stage dekhne ke liye tayyar?' },
  finalBody: {
    en: "This is a demo with fictional sample data — the real thing can be your agency's website.",
    ur: 'Ye fictional sample data wali demo hai — asli cheez aap ki agency ki website ho sakti hai.',
  },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('gulflink-lang');
      if (saved === 'ur' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem('gulflink-lang', l);
    } catch {}
  };

  const t = (key: string): string => {
    const s = STRINGS[key];
    if (!s) return key;
    return s[lang];
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  return useContext(Ctx);
}
