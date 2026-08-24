import type { Metadata } from 'next';
import './globals.css';
import './reservoir.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fungamesfunceme.github.io/reservatorio-3d/'),
  title: 'Reservatório 3D — Relógio da Seca de Tauá',
  description: 'Simulação conceitual interativa dos estados de seca de um reservatório.',
  openGraph: {
    title: 'Reservatório 3D — Relógio da Seca de Tauá',
    description: 'Explore os estados de seca de um reservatório em um modelo conceitual interativo.',
    images: [{ url: '/reservatorio-3d/reservatorio-og.png', width: 1200, height: 630 }],
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
