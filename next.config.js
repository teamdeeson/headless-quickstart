/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      use: [
        {
          loader: "graphql-tag/loader",
          options: {
            validate: true,
            schema: "./schema.graphql",
          },
        },
      ],
    });
    return config;
  },
};
