import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { storage } from '../firebase';
import {listAll, ref, getDownloadURL} from "firebase/storage";
import { useTheme } from 'next-themes';

import { Banner, CreatorCard, SearchBar, Loader, Intro } from '../components/index';
import NFTCard from '../components/NFTCard.jsx';
import { NFTContext } from '../context/NFTContext';
import { getCreators } from '../utils/getTopCreators';
import { shortenAddress } from '../utils/shortenAddress';
import { makeid } from '../utils/makeId';
import images from "../assets/index"

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);

  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "/creators");

  const [hideButton, setHideButton] = useState(false);
  const { theme } = useTheme();
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeSelect, setActiveSelect] = useState('Recently added');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, [...prev, url]])
        })
      })
    })
  }, [])

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

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

  const topCreators = getCreators(nftsCopy);

  return (
    <div className="flex justify-center p-12 sm:px-4">
      {/* Used to put a wallet Switch request at the beginning */}
      <Intro />
      <div className="w-full minmd:w-4/5">
        <Banner
          name={(<>Discover, collect, and sell <br /> extraordinary NFTs</>)}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        {!isLoading && !nfts.length ? (
          <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">That&apos;s weird... No NFTs for sale!</h1>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">Top Sellers</h1>
            </div>

            <div className="relative mt-3 flex max-w-full flex-1" ref={parentRef}>
              <div className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll" ref={scrollRef}>
                {topCreators.map((creator, i) => (
                  <CreatorCard
                    key={creator.seller}
                    rank={i + 1}
                    creatorImage={`https://firebasestorage.googleapis.com/v0/b/nft-marketplace-332cc.appspot.com/o/creators%2Fcreator${i + 1}.png?alt=media&token=a9f5cabe-d7a8-462b-945e-3ef375913764`}
                    creatorName={shortenAddress(creator.seller)}
                    creatorEths={creator.sumall}
                  />
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
                <h1 className="flex-1 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white sm:mb-4 minlg:text-4xl">Hot NFTs</h1>
                <div className="flex flex-2 flex-row sm:w-full sm:flex-col">
                  <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch} />
                </div>
              </div>
              <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}

                {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <NFTCard
                    key={`nft-${i}`}
                    nft={{
                      name: `Nifty NFT ${i}`,
                      image: `https://firebasestorage.googleapis.com/v0/b/nft-marketplace-332cc.appspot.com/o/creators%2Fnft${i}.png?alt=media&token=a9f5cabe-d7a8-462b-945e-3ef375913764`,
                      price: (10 - i * 0.534).toFixed(2),
                      seller: `0x${makeid(3)}...${makeid(4)}`,
                      owner: `0x${makeid(3)}...${makeid(4)}`,
                      description: 'Cool NFT on Sale',
                    }}
                  />
                ))} */}
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;
