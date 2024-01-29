import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import searchBrands from '@models/brand/search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const results = term ? await searchBrands(term) : [];
  return NextResponse.json(results);
}
