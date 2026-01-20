// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: {
    default: 'Drvodjelja | 30 godina sa vama - Miljenko Bošnjak',
    template: '%s | Drvodjelja',
  },
  description: 'Stolarska radionica Drvodjelja - Miljenko Bošnjak. 30 godina iskustva u izradi kuhinja po mjeri, vrata, namještaja, stepenica i ostale stolarije od kvalitetnog drva.',
  keywords: ['stolar', 'stolarska radionica', 'namještaj po mjeri', 'kuhinje', 'vrata', 'drvo', 'stepenice', 'Miljenko Bošnjak', 'drvodjelja'],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      </head>
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
