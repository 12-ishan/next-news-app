import path from 'path';

const nextConfig = { 
  env: {
   API_URL: 'https://codeavoid.com/console/api',
   // API_URL: 'http://127.0.0.1:8000/api',
  },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
   
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: '127.0.0.1',
      //   port: '8000',
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '3000',
      // },
      {
        protocol: 'https',
        hostname: 'codeavoid.com',
        port: '',
        pathname: '/console/**'
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.resolve.alias['@components'] = path.join(process.cwd(), 'components');
    return config;
  },
};

export default nextConfig;
