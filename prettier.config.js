/** @type {import('prettier').Options} */
const prettierConfig = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  importOrder: [
    '^server-only$',
    '<THIRD_PARTY_MODULES>',
    '^@(app|components|i18n|models|services)/((?!svg$|css$).)*$',
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
