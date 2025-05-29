/** @type {import('next').NextConfig} */
const nextConfig = {
    unstable_allowDynamic: [
    '**/node_modules/puppeteer/**',
  ],
  images: {
    domains: ['logo.clearbit.com'],
  },
};

export default nextConfig;

