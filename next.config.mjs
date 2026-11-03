/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=2592000" }];
    return ["/me/:path*", "/case/:path*", "/covers/:path*", "/logos/:path*"].map((source) => ({ source, headers: cache }));
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" }
    ]
  }
};

export default nextConfig;
