import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';

const NFTCard = ({ nft }) => (
  <Link href={{ pathname: '/nft-details', query: { nft } }}>
    <div className="">
      {nft.name}
    </div>
  </Link>
);

export default NFTCard;
