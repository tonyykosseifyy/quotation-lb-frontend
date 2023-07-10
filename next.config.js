/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    SERVER_APP_BASE_URL: "http://localhost:8000",
  },
};

module.exports = nextConfig;
