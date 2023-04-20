import { Button, Navbar } from 'flowbite-react';
import cn from 'clsx';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import React from 'react';
import { HiOutlineDownload } from 'react-icons/hi';

export default function Header({
  openLeft,
  openRight,
  setOpenLeft,
  setOpenRight,
  toggleModal,
}) {
  const toggleOpenLeft = () => setOpenLeft((prev) => !prev);
  const toggleOpenRight = () => setOpenRight((prev) => !prev);
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={cn('absolute top-0 left-0 right-0 transition-spacing', {
        'ml-0': !openLeft,
        'ml-64': openLeft,
        'mr-0': !openRight,
        'mr-64': openRight,
      })}
    >
      {/* <Navbar.Brand href='https://flowbite.com/'>
        <img
          src='https://flowbite.com/docs/images/logo.svg'
          className='mr-3 h-6 sm:h-9'
          alt='Flowbite Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Flowbite
        </span>
      </Navbar.Brand> */}
      {/* <Button color='light' size='sm' onClick={toggleOpenLeft}>
        {openLeft ? <RxCross1 /> : <RxHamburgerMenu />}
      </Button> */}
      <Button color='light' size='sm' onClick={toggleModal}>
        <HiOutlineDownload />
        Load
      </Button>
      <div className='flex md:order-2'>
        {/* <Button color='light' size='sm' onClick={toggleOpenRight}>
          {openRight ? <RxCross1 /> : <RxHamburgerMenu />}
        </Button> */}
        {/* <Navbar.Toggle /> */}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href='/navbars' active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href='/navbars'>About</Navbar.Link>
        <Navbar.Link href='/navbars'>Services</Navbar.Link>
        <Navbar.Link href='/navbars'>Pricing</Navbar.Link>
        <Navbar.Link href='/navbars'>Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
