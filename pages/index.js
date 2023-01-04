import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard } from '../components/index';

import images from '../assets';
import NFTCard from '../components/NFTCard.jsx';
import { makeId } from '../utils/makeId';
import { NFTContext } from '../context/NFTContext';

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [hideButton, setHideButton] = useState(false);
  const { theme } = useTheme();
  const [nfts, setNfts] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items);
        console.log(items);
      });
  }, []);

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // Hide arrows when all creato cards fit with the screen
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButton(false);
    } else {
      setHideButton(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner name="Discover, collect, and sell extraordinary NFTs" childStyles="md:text-4xl sm:text-3xl xs-text-xl text-left" parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl" />

        <div>
          <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">Best Creators</h1>
        </div>

        <div className="relative mt-3 flex max-w-full flex-1" ref={parentRef}>
          <div className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll" ref={scrollRef}>
            {[6, 7, 8, 9, 10].map((i) => (
              <CreatorCard key={`creator-${i}`} rank={i} creatorImage={images[`creator${i}`]} creatorName={`0x${makeId(3)}...${makeId(4)}`} creatorEths={10 - i * 0.5} />
            ))}
            {!hideButton && (
            <>
              <div onClick={() => { handleScroll('left'); }} className="absolute top-45 left-0 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                <Image src={images.left} layout="fill" objectFit="contain" alt="left-arrow" className={theme === 'light' && 'invert'} />
              </div>
              <div onClick={() => { handleScroll('right'); }} className="absolute top-45 right-0 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                <Image src={images.right} layout="fill" objectFit="contain" alt="right-arrow" className={theme === 'light' && 'invert'} />
              </div>
            </>
            )}
          </div>

        </div>
        <div className="mt-10">
          <div className="flexBetween mx-4 sm:flex-col sm:items-start xs:mx-0 minlg:mx-8">
            <h1 className="flex-1 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white sm:mb-4 minlg:text-4xl">Hot Bids</h1>
            <div>SearchBar</div>
          </div>
          <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.532).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  ownder: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on sale',
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
