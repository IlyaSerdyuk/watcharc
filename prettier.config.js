/** @type {import('prettier').Options} */
const prettierConfig = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  importOrder: [
    '^@/((?!svg$|css$).)*$',
    '^[./].((?!svg$|css$).)*$',
    '.(css|svg)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

module.exports = prettierConfig;
