import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
    ...tsEslint.config(eslint.configs.recommended, ...tsEslint.configs.recommended, prettier, {
        rules: {
            'linebreak-style': 'off',
            'max-depth': ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'prefer-template': ['error'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
        },
    }),
];
