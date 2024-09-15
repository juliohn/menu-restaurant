/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["preodemo.gumlet.io"],
  },
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
