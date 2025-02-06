/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api-reference/rpc-providers',
        destination: 'https://build.avax.network/integrations#RPC%20Providers',
        permanent: true,
      },  
    ]
  },
};

export default config;
