function convertArabicToRoman(num: number) {
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

export default function centuryHelper(lng: Languages, century: number) {
  // eslint-disable-next-line default-case
  switch (lng) {
    case 'ru':
      return convertArabicToRoman(century);
    case 'en':
      return ordinalSuffixOf(century);
    default:
      return century;
  }
}
