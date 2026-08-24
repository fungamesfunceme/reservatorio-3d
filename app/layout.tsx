import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Reservatório 3D — Relógio da Seca de Tauá',
  description: 'Simulação conceitual interativa dos estados de seca do Hidrossistema Arneiroz II.',
  openGraph: {
    title: 'Reservatório 3D — Relógio da Seca de Tauá',
    description: 'Explore os estados de seca do Hidrossistema Arneiroz II em um modelo conceitual interativo.',
    images: [{ url: '/reservatorio-og.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
