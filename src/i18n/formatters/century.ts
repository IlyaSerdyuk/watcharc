import type { i18n } from 'i18next';

function arabicToRoman(num: number) {
  const rules: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    XXX: 30,
    XX: 20,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let res = '';
  const romans = Object.keys(rules);
  let n = num;

  for (let i = 0; i < romans.length; i += 1) {
    const val = rules[romans[i]];

    while (n >= val) {
      n -= val;
      res += romans[i];
    }
  }
  return res;
}

function ordinalSuffixOf(i: number) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

export default function initCenturyFormatter(i18nInstance: i18n) {
  i18nInstance.services.formatter?.add('century', (value, lng) => {
    if (!Number.isNaN(+value)) {
      switch (lng) {
        case 'en':
          return ordinalSuffixOf(value);
        case 'de':
          return `${value}.`;
        case 'fr':
          return `${value}e`;
        case 'ru':
          return arabicToRoman(value);
        default:
          return value;
      }
    }
    return value;
  });
}
