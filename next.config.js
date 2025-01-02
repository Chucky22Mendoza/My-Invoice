/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  i18n: {
    defaultLocale: "es-ES",
    locales: ["en-US", "es-ES"],
  },
  env: {
    secret_jwt_key: "$yimi-xilion-2023$",
    mode: "server_ip",
  },
  webpack: (config, { webpack }) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });
    config.resolve.alias.canvas = false;
    return config
  },
};
