import Diacritics from 'diacritic';

export default function mapBrandListToGroups<
  T extends { title: string }[] = [],
>(rows: T) {
  return rows.reduce((list, row) => {
    const firstSymbol = Diacritics.clean(row.title[0].toUpperCase())[0];
    if (!list.has(firstSymbol)) {
      list.set(firstSymbol, [] as unknown as T);
    }
    list.get(firstSymbol)?.push(row);
    return list;
  }, new Map<string | null, T>());
}
