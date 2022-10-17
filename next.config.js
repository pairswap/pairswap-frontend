module.exports = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-dns-prefetch-control',
            value: 'on',
          },
          {
            key: 'strict-transport-security',
            value: 'max-age=63072000; includesubdomains; preload',
          },
          {
            key: 'x-xss-protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
