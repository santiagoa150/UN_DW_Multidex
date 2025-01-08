import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
    js.configs.recommended,
    ...tsEslint.configs.recommended,
    eslintPluginPrettier,
    {
        languageOptions: {
            ecmaVersion: 2024,
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            reactHooks,
            reactRefresh,
        },
        rules: {
            'arrow-body-style': 'off',
            'linebreak-style': ['error', 'unix'],
            'max-depth': ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
            'prefer-template': ['error'],
            quotes: ['error', 'single', { avoidEscape: true }],
            'reactHooks/exhaustive-deps': 'error',
            'reactHooks/rules-of-hooks': 'error',
            'reactRefresh/only-export-components': ['error', { allowConstantExport: true }],
            semi: ['error', 'always'],
        },
    },
];
