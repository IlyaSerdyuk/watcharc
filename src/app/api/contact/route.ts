import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import saveMessage from '@models/message/saveMessage';
import { notify } from '@services/telegram';

// на основе https://gist.github.com/shameen/17dbbba4b4e078de154c612c86ab0be1
const asyncWithTimeout = async <T>(
  promise: Promise<T>,
  milliseconds = 10_000,
): Promise<T> => {
  const timeoutPromise = new Promise((_, reject) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(
      () => reject(new Error(`Timeout after ${milliseconds} ms`)),
      milliseconds,
    ),
  );

  return Promise.race([promise, timeoutPromise])
    .then(result => result as T)
    .catch(e => {
      throw Error(e);
    });
};

export async function POST(request: NextRequest) {
  try {
    const { message, email } = await request.json();
    if (!message) {
      throw Error('not message');
    }
    await Promise.allSettled([
      saveMessage({ message, email: email || undefined }),
      asyncWithTimeout(notify({ message, email }), 5_000),
    ]);
    return NextResponse.json({ status: 'success' });
  } catch (e) {
    return NextResponse.json({ status: 'fail' });
  }
}
