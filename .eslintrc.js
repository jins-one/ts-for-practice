module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es2017: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'next/core-web-vitals',
        'prettier',
    ],
    plugins: [
        'react',
        'jsx-a11y',
        'import',
        '@typescript-eslint',
        'simple-import-sort',
        'unused-imports',
        'prettier',
    ],
    ignorePatterns: ['*rc.js', '**/*.config.js', '**/*.setup.js'],
    globals: {},
    rules: {
        'linebreak-style': 0,
        // prettier
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],

        // TypeScript
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
        /* 명시적인 return type 작성*/
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // js
        camelcase: 'off',
        'consistent-return': 'off',
        'no-console': ['warn', { allow: ['error', 'warn'] }],

        // v4 changes
        'no-use-before-define': 'off',
        'no-shadow': 'off',

        // jsx-a11y
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelAttributes: ['htmlFor'],
            },
        ],

        // React
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'warn',
        'react/button-has-type': 'warn',
        'react/require-default-props': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',

        // import
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['/**/*.ts?(x)'] },
        ],
        'unused-imports/no-unused-imports-ts': ['warn'],

        // simple-import-sort
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },

    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
                paths: ['/'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: `${__dirname}/tsconfig.json`,
            },
        },
        'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx'],
    },

    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    ],
};