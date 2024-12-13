module.exports = {
    root: true,
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
        'eslint-config-ay/react',
        'eslint-config-ay/typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // 这一行启用 Prettier
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'no-unused-vars': 'off',
        'react/display-name': 'off',
        'prettier/prettier': 'error', // 确保 Prettier 的规则作为 ESLint 错误处理
        // 可以添加你自定义的 ESLint 规则
    },
};
