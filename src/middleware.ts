import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

import { fallbackLng, languages } from '@i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

const cookieName = 'i18next';

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.indexOf('icon') > -1 ||
    request.nextUrl.pathname.indexOf('chrome') > -1
  ) {
    return NextResponse.next();
  }

  let lng;
  if (request.cookies.has(cookieName)) {
    lng = acceptLanguage.get(request.cookies.get(cookieName)?.value);
  }
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_next')
  ) {
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
