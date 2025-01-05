/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        http: false,
        https: false,
        zlib: false,
      };
    }

    // Add specific rule for undici
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]undici[\\/].*\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: '#target',
        replace: 'Symbol.iterator',
        flags: 'g'
      }
    });

    return config;
  },
  experimental: {
    esmExternals: 'loose'
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 