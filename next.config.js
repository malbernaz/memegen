/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgflip.com"],
  },
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;
