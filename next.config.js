module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
