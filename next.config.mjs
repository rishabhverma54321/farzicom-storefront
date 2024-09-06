/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farzistore-media.farziengineer.co',
        port: '',
        pathname: '/**', // Allows all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
