/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // 301 (permanent) redirects from old Wix URLs -> new URLs.
    // The city pages keep the same /website-development/[city] path, so
    // those need no redirect. We finalize this list from your live sitemap.
    return [
      { source: '/seo-packages', destination: '/#pricing', permanent: true },
      { source: '/in-store-ads', destination: '/#instore', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
