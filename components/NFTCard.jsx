import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';

const NFTCard = ({ nft }) => (
  <Link href={{ pathname: '/nft-details', query: nft }}>
    <div className="m-4 min-w-215 max-w-max flex-1 cursor-pointer rounded-2xl bg-white p-4 shadow-lg dark:bg-nft-black-3 sm:m-2 sm:w-full sm:min-w-155 xs:max-w-none minmd:min-w-256 minlg:m-8 minlg:min-w-327">
      <div className="mindmd:h-60 relative h-52 w-full overflow-hidden rounded-2xl sm:h-36 xs:h-56 minlg:h-300">
        <Image src={nft.image || images[`nft${nft.i}`]} layout="fill" objectFit="cover" alt={`nft ${nft.i}`} />
      </div>
      <div className="mt-3 flex flex-col ">
        <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">{nft.name}</p>
        <div className="flexBetween mt-3 flex flex-row xs:mt-3 xs:flex-col xs:items-start minlg:mt-3">
          <p className="font-poppins text-xs font-semibold text-nft-black-1 dark:text-white minlg:text-lg">{nft.price} <span className="normal">ETH</span></p>
          <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">{nft.seller}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default NFTCard;
