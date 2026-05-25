import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    plugins: {
      react: reactPlugin,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // Enforce consistent 2-space indentation
      indent: ['warn', 2],
      // Require semicolons — catches missing terminators
      semi: ['warn', 'always'],
      // Warn on unused variables — catches typos and dead code
      'no-unused-vars': ['warn', { args: 'after-used' }],
      // Warn on leftover console.log calls
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // React import not needed with new JSX transform
      'react/react-in-jsx-scope': 'off',
      // Prop types advisory — disabled due to flat-config compatibility
      'react/prop-types': 'off',
      // HOC (connect()) wrapped exports are expected in this project
      'react-refresh/only-export-components': 'off',
      // Missing deps advisory only
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
