import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Assistant from '../components/Assistant';

export const metadata: Metadata = {
  title: 'GulfLink Overseas Employment — Demo by AKCLNT',
  description: 'Demo recruitment agency website + CRM: jobs, fees, application tracking and a candidate pipeline.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Assistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
