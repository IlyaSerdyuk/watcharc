import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import saveMessage from '@models/message/saveMessage';

export async function POST(request: NextRequest) {
  try {
    const { message, email } = await request.json();
    if (!message) {
      throw Error('not message');
    }
    saveMessage({ message, email: email || undefined });
    return NextResponse.json({ status: 'success' });
  } catch (e) {
    return NextResponse.json({ status: 'fail' });
  }
}
