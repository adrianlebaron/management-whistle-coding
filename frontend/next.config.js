module.exports = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.apiKey,
  },
  async redirects() {
    return [
      {
        source: '/protected',
        destination: '/login',
        permanent: false,
      },
      // Add other redirects if necessary
    ]
  },
}