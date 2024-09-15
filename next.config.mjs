// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
  images: {
    domains: ["preodemo.gumlet.io"],
  },
  reactStrictMode: true,
};

export default nextConfig;
