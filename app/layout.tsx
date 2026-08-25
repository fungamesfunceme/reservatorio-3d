import type { Metadata } from 'next';
import './globals.css';
import './reservoir.css';

const shareTitle = 'Reservatório 3D - Relógio da Seca de Hidrossistema';
const shareDescription = 'Explore os estados de seca de um reservatório em um modelo 3D interativo.';

export const metadata: Metadata = {
  metadataBase: new URL('https://fungamesfunceme.github.io/reservatorio-3d/'),
  title: shareTitle,
  description: shareDescription,
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    images: [{ url: '/reservatorio-3d/reservatorio-og.png', width: 1200, height: 630, alt: 'Modelo tridimensional de um reservatório e sua barragem' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: shareTitle,
    description: shareDescription,
    images: ['/reservatorio-3d/reservatorio-og.png'],
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
