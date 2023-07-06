import { dir } from 'i18next';
import { Inter } from 'next/font/google';

import useTranslation from '@i18n/server';
import { languages } from '@i18n/settings';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { lng } }: PageProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
