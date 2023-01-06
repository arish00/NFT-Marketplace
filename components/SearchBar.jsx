import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flexCenter flex-1 rounded-md border border-nft-gray-2 bg-white py-3 px-4 dark:border-nft-black-2 dark:bg-nft-black-2">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' ? 'invert' : undefined}
        />
        <input
          type="text"
          placeholder="Search item here"
          className="mx-4 w-full bg-white font-poppins text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="flexBetween relative ml-4 min-w-190 cursor-pointer rounded-md border border-nft-gray-2 bg-white py-3 px-4 dark:border-nft-black-2 dark:bg-nft-black-2 sm:ml-0 sm:mt-2"
      >
        <p className="font-poppins text-xs font-normal text-nft-black-1 dark:text-white">{activeSelect}</p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'invert' : undefined}
        />

        {toggle && (
          <div className="absolute inset-x-0 top-full z-10 mt-3 w-full rounded-md border border-nft-gray-2 bg-white py-3 px-4 dark:border-nft-black-2 dark:bg-nft-black-2">
            {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
              <p
                className="my-3 cursor-pointer font-poppins text-xs font-normal text-nft-black-1 dark:text-white"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
