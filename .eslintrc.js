export default {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
        'eslint-config-ay/react',
        'eslint-config-ay/typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    parserOptions: {
        ecmaVersion: 2020, // 支持现代 JavaScript 语法
        sourceType: 'module', // 启用 ES 模块
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
