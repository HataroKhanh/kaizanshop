module.exports = {
  // extends: ['next/core-web-vitals', ...],
  rules: {
    '@next/next/no-img-element': 'off',
    // 'react-hooks/rules-of-hooks': 'off',   // ❗không khuyến nghị
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: { 'no-console': 'off' }
    },
  ],
  ignorePatterns: ['.next/**', 'dist/**'],
};
