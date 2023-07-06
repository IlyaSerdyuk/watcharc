import { db } from '@services/Db';

import { BRAND_FIRST_NUMBER } from './types';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';

/**
 * Получить карту по первым буквам названия.
 *
 * @return Record<буква, количество>
 */
export default async function getAlphabetIndex() {
  const alphabet = LETTERS.split('').reduce<Record<string, number>>(
    (map, letter) => {
      map[letter] = 0; // eslint-disable-line no-param-reassign
      return map;
    },
    {},
  );
  alphabet[BRAND_FIRST_NUMBER] = 0;

  const rows: Array<{
    letter: string;
    number: number;
  }> = await db.brandAliases
    .select({
      letter: db.knex.raw('SUBSTRING(title, 1, 1)'),
      number: db.knex.raw('COUNT(*)'),
    })
    .groupBy('letter')
    .havingRaw(`"${LETTERS}${NUMBERS}" LIKE CONCAT("%", letter, "%")`);

  return rows.reduce((map, { letter, number }) => {
    const key = NUMBERS.includes(letter)
      ? BRAND_FIRST_NUMBER
      : letter.toLowerCase();
    map[key] = number + (map[key] || 0); // eslint-disable-line no-param-reassign
    return map;
  }, alphabet);
}
