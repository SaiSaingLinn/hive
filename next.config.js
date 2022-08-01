/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['beehive-images.hivestage.com'],
    loader: 'imgix',
    path: '',
  }
}

module.exports = nextConfig