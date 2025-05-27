/** @type {import('next').NextConfig} */
const nextConfig = {
    unstable_allowDynamic: [
    '**/node_modules/puppeteer/**',
  ],
};

export default nextConfig;

