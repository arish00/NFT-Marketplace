/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "src",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "yasindu-nft-marketplace.infura-ipfs.io",
      "infura-ipfs.io",
      "ipfs.infura.io",
      "firebasestorage.googleapis.com",
      "https://eth-goerli.g.alchemy.com/v2/nrwjWYK8BGomfvFAZ5DO_mTwwXQY8bQ_",
    ],
  },
};

module.exports = nextConfig;
