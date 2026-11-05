import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,

  // Don't lint code blocks inside markdown files
  markdown: false,
  jsx: true,
  css: true,
  formatters: {
    css: true,
  },

  ignores: [
    'dist/**',
    'node_modules/**',
    'package.json',
    'package-lock.json',
    '.claude/**',
  ],

  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  rules: {
    // Allow unused vars prefixed with _ (TypeScript convention)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // html`` tag function returns .value — keep template literals flexible
    'no-template-curly-in-string': 'off',
  },
})
