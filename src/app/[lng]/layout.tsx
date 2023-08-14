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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
      <body className={inter.className}>
        {children}
        <Footer lng={lng} />
      </body>
    </html>
  );
}
