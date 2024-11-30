import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // Adiciona o domínio permitido
  },
};

export default nextConfig;
