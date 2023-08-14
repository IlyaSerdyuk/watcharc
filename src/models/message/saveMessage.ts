import { db } from '@services/Db';

export default async function saveMessage({
  message,
  email,
}: {
  message: string;
  email?: string;
}) {
  await db.messages.insert({ message, email });
}
