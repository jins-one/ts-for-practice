import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parsers['@typescript-eslint/parser'],
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: globals.node,
        },
        env: {
            node: true,
            es2021: true,
        },
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        rules: {
            // General
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            eqeqeq: ['error', 'always'],
            semi: ['error', 'always'],
            quotes: ['error', 'single', { avoidEscape: true }],
            indent: ['error', 2],

            // TypeScript
            '@typescript-eslint/no-explicit-any': 'warn',

            // Import sorting & unused imports
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
        settings: {
            // Additional resolver settings if needed
            'import/resolver': {
                typescript: { project: './tsconfig.json' },
            },
        },
    },
);
