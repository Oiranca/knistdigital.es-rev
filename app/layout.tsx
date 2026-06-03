import type { Metadata } from 'next';
import { Nunito, Red_Hat_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--kd-body',
  subsets: ['latin'],
});

const redHatDisplay = Red_Hat_Display({
  variable: '--kd-display',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--kd-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'KnitsDigital — Code Studio',
  description: 'Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.',
  generator: 'Next.js',
  icons: {
    icon: '/assets/isotype.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${nunito.variable} ${redHatDisplay.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
