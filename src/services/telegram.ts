const replacements = [
  [/\*/g, '\\*', 'asterisks'],
  [/#/g, '\\#', 'number signs'],
  [/\//g, '\\/', 'slashes'],
  [/\(/g, '\\(', 'parentheses'],
  [/\)/g, '\\)', 'parentheses'],
  [/\[/g, '\\[', 'square brackets'],
  [/\]/g, '\\]', 'square brackets'],
  [/</g, '&lt;', 'angle brackets'],
  [/>/g, '&gt;', 'angle brackets'],
  [/_/g, '\\_', 'underscores'],
  [/`/g, '\\`', 'codeblocks'],
];

// на основе https://github.com/kemitchell/markdown-escape.js
export function markdownEscape(input: string, skips: string[] = []) {
  return replacements.reduce((string, replacement) => {
    const name = replacement[2];
    return name && skips.indexOf(name as string) !== -1
      ? string
      : string.replace(replacement[0], replacement[1] as string);
  }, input);
}

export async function notify({
  message,
  email,
}: {
  message: string;
  email: string;
}) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let text = markdownEscape(message, ['slashes']).trim();
  if (email) {
    text = `${text}\n\n--\nFrom: ${markdownEscape(email)}`;
  }

  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  });
}
