// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: {
    default: 'Drvodjelja | 30 godina sa vama',
    template: '%s | Drvodjelja',
  },
  description: 'Stolarska radionica s 30 godina iskustva. Izrađujemo kuhinje po mjeri, vrata, namještaj, stepenice i ostalu stolariju od kvalitetnog drva.',
  keywords: ['stolar', 'stolarska radionica', 'namještaj po mjeri', 'kuhinje', 'vrata', 'drvo', 'stepenice'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <Header />
        <main className="pt-16 md:pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
