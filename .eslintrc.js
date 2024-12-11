module.exports = {
    root: true,
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
        'eslint-config-ay/react',
        'eslint-config-ay/typescript',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
};
