/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['yasindu-nft-marketplace.infura-ipfs.io', 'infura-ipfs.io', 'ipfs.infura.io'],
  },
};

module.exports = nextConfig;
