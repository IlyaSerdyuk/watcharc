import acceptLanguage from 'accept-language';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fallbackLng, languages } from '@i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};

const cookieName = 'i18next';

const exclusionList = [
  '/favicon.ico',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-icon.png',
  '/manifest.webmanifest',
  '/sitemap.xml',
  '/robots.txt',
];

export function middleware(request: NextRequest) {
  if (
    exclusionList.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/logo/') ||
    request.nextUrl.pathname.startsWith('/caliber/')
  ) {
    return NextResponse.next();
  }

  let lng;
  if (request.cookies.has(cookieName)) {
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  }
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  const lngInPath = languages.some(loc => {
    const { pathname } = request.nextUrl;
    return pathname === `/${loc}` || pathname.startsWith(`/${loc}/`);
  });

  if (!lngInPath && !request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
    );
  }

  if (request.headers.has('referer')) {
    const response = NextResponse.next();

    const referer = request.headers.get('referer');
    if (referer) {
      const refererUrl = new URL(referer);
      const lngInReferer = languages.find(l =>
        refererUrl.pathname.startsWith(`/${l}`),
      );
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    }

    return response;
  }

  return NextResponse.next();
}
