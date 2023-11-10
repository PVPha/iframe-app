/** @type {import('next').NextConfig} */

const { i18n } = require('./i18n.config');

const nextConfig = {
    reactStrictMode: true,
    i18n,
    rules: {
        'react/no-unknown-property': ['error', { ignore: ['theme'] }],
    },
    staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
