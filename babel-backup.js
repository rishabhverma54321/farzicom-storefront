module.exports = api => {
  const isExtract = api.env("extract");
  const isTest = api.env("test");
  const isStorybook = api.env("storybook");

  const ignore =
    isTest || isStorybook
      ? []
      : ["**/*.test.ts", "**/*.test.tsx", "src/storybook"];
  const presets = [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],

    [
      "@babel/preset-typescript",
      {
        allowNamespaces: true,
      },
    ],
    ["next/babel"],
  ];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "transform-class-properties",
    "@babel/transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "lodash",
    [
      "react-intl-auto",
      {
        filebase: true,
        includeExportName: "all",
        removePrefix: "src/",
      },
    ],
    ["styled-components", { ssr: true }],
  ];
  if (isExtract) {
    plugins.push([
      "react-intl",
      {
        extractFromFormatMessageCall: true,
        messagesDir: "dist/locale/",
      },
    ]);
  }

  plugins.push("macros");

  plugins.push([
    "babel-plugin-transform-imports",
    {
      "@material-ui/core": {
        transform: member => `@material-ui/core/${member}`,
        preventFullImport: true,
      },
    },
  ]);

  return {
    ignore,
    plugins,
    presets,
  };
};
