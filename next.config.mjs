/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    // This ignores TypeScript build errors. Be cautious with this.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farzistore-media.farziengineer.co",
        port: "",
        pathname: "/**", // Allows all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "images.plixlife.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
