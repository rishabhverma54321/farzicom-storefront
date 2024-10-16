/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  staticPageGenerationTimeout: 1000,
  productionBrowserSourceMaps: false,
  distDir: process.env.NEXT_PUBLIC_BUILD_DIR || ".next",
  typescript: {
    // This ignores TypeScript build errors. Be cautious with this.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
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
      {
        protocol: "https",
        hostname: "plixlifefcstage-media.farziengineer.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plixlife-fc.imgix.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn4.fireworktv.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
    webpack: config => {
    //let myConfig = webPackConfig({}, {});
    config.module.rules.push(
      // {
      //   test: /\.svg$/,
      //   issuer: {
      //     and: [/\.(js|ts)x?$/],
      //   },

      //   use: ["@svgr/webpack"],
      // },
      // {
      //   test: /\.(gif|jpg|png|svg)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[path][name].[ext]",
      //         outputPath: "images/",
      //         publicPath: "/images/",
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     {
      //       loader: "ts-loader",
      //       options: {
      //         getCustomTransformers() {
      //           return {
      //             before: [
      //               transform({
      //                 overrideIdFn: "[sha512:contenthash:base64:6]",
      //               }),
      //             ],
      //           };
      //         },
      //         transpileOnly: true,
      //       },
      //     },
      //   ],
      // }
    );
    return config;
  },
};

export default nextConfig;
