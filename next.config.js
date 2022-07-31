module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['beehive-images.hivestage.com'],
    loader: 'imgix',
    path: '',
  },
  env: {
    HIVE_ENDPOINT: process.env.HIVE_ENDPOINT,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
}
