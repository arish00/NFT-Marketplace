import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import Button from './Button';

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/listed-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul className={`flexCenter list-none flex-row ${isMobile && 'h-full flex-col'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);

            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${active === item
            ? 'text-nft-black-1 dark:text-white'
            : 'text-nft-gray-2 dark:text-nft-gray-3'} 
          ${isMobile && 'my-5 text-xl'}`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <div className="flexCenter">
      <Button
        btnName="Create"
        btnType="primary"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive('');
          router.push('/create-nft');
        }}
      />
    </div>
  ) : (
    <Button
      btnName="Connect"
      btnType="outline"
      classStyles="mx-2 rounded-lg"
      handleClick={connectWallet}
    />
  );
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/listed-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;
    case '/create-nft':
      if (active !== '') setActive('');
      break;
    default:
      setActive('');
  }
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  useEffect(() => {
    // disable body scroll when navbar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isOpen]);

  return (
    <nav className="flexBetween  z-10 w-full flex-row border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter cursor-pointer md:hidden" onClick={() => setActive('Explore NFTs')}>
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className=" ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">CryptoKet</p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs');
              setIsOpen(false);
            }}
          >
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="mr-2 flex items-center">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween label relative h-4 w-8 rounded-2xl bg-black p-1">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="ball absolute h-3 w-3 rounded-full bg-white" />
          </label>
        </div>

        <div className="flex md:hidden">
          <ul className="flexCenter list-none flex-row">
            <MenuItems active={active} setActive={setActive} />
          </ul>
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      <div className="ml-2 hidden md:flex">
        {!isOpen
          ? (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'light' ? 'invert' : undefined}
            />
          )
          : (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'light' ? 'invert' : undefined}
            />
          )}

        {isOpen && (
          <div className="nav-h fixed inset-0 top-65 z-10 flex flex-col justify-between bg-white dark:bg-nft-dark">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="border-t border-nft-gray-1 p-4 dark:border-nft-black-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
