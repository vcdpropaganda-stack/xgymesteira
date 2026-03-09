/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xgymct.com.br"
      },
      {
        protocol: "https",
        hostname: "s2-glamour.glbimg.com"
      },
      {
        protocol: "https",
        hostname: "i.s3.glbimg.com"
      },
      {
        protocol: "https",
        hostname: "vacuactiv.com"
      }
    ]
  }
};

export default nextConfig;
