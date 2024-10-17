/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["register-service-worker"]);
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const { transform } = require("@formatjs/ts-transformer");

// // 2. create a transformer;
// // the factory additionally accepts an options object which described below
// const styledComponentsTransformer = createStyledComponentsTransformer();
module.exports = withTM({
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
  swcMinify: true,
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
  webpack: (config) => {
    // Assuming you have a custom Webpack configuration named `webPackConfig`
    // let myConfig = webPackConfig({}, {});

    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            getCustomTransformers() {
              return {
                before: [
                  transform({
                    overrideIdFn: "[sha512:contenthash:base64:6]",
                  }),
                ],
              };
            },
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  },
});
