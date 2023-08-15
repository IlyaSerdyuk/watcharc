import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import translate from '@i18n/server';
import { languages } from '@i18n/settings';

import Footer from './Footer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { lng },
}: PageProps): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title: 'WatchArc',
    description: t('meta-description'),
  };
}

export async function generateStaticParams() {
  return languages.map(lng => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: Languages };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
