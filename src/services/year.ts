export const enum YearAccuracy {
  Year = 'year',
  Decade = 'decade',
  Century = 'century',
}

export function formatYear(year: number, accuracy: YearAccuracy): string {
  switch (accuracy) {
    case YearAccuracy.Year:
      return `${year}`;
    case YearAccuracy.Decade:
      return `${year / 10}x`;
    case YearAccuracy.Century:
      return `${year / 100}xx`;
    default:
      return '';
  }
}
