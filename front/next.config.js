/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //나중에 이부분 없애기
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/stamp",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
