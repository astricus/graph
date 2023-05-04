import { Button, Label, Navbar, RangeSlider } from 'flowbite-react';
import cn from 'clsx';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import React from 'react';
import {
  HiOutlineAdjustments,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlineUpload,
} from 'react-icons/hi';
import { FaUndoAlt, FaRedoAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { exportOrigin } from '../store/data/data.actions';

export default function Header({
  openLeft,
  openRight,
  setOpenLeft,
  setOpenRight,
  toggleModal,
}) {
  const dispatch = useDispatch();

  const onClickExport = () => {
    dispatch(exportOrigin());
  };
  const toggleOpenLeft = () => setOpenLeft((prev) => !prev);
  const toggleOpenRight = () => setOpenRight((prev) => !prev);
  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={cn(
        'absolute top-0 left-0 right-0 transition-spacing shadow-sm h-16 py-3',
        {
          'ml-0': !openLeft,
          'ml-64': openLeft,
          'mr-0': !openRight,
          'mr-64': openRight,
        }
      )}
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
      <Button
        className='mr-3 border-0'
        color='light'
        size='sm'
        onClick={toggleOpenLeft}
      >
        {openLeft ? <RxCross1 /> : <RxHamburgerMenu />}
      </Button>
      <div className='flex min-w-fit w-6/12'>
        <Button className='mr-3' size='sm' onClick={toggleModal}>
          <HiOutlineDownload className='mr-1 text-base' />
          Load
        </Button>
        <Button
          className='mr-3 border-0'
          color='light'
          size='sm'
          onClick={onClickExport}
        >
          <HiOutlineUpload className='mr-1 text-base' />
          Export
        </Button>
        <Button
          className='mr-3 border-0'
          color='light'
          size='sm'
          onClick={onClickExport}
        >
          <HiOutlineAdjustments className='mr-1 text-base' />
          Settings
        </Button>
        <Button
          className='mr-3 border-0'
          color='light'
          size='sm'
          onClick={onClickExport}
        >
          <HiOutlineInformationCircle className='mr-1 text-base' />
          About
        </Button>
        <div className='flex flex-col items-end -translate-y-2 mr-6'>
          <Label
            htmlFor='zoom-range'
            className='-mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'
            value='100%'
          />
          <RangeSlider className='w-56' id='zoom-range' />
        </div>
        <Button.Group>
          <Button
            color='light'
            size='sm'
            onClick={onClickExport}
          >
            <FaUndoAlt className='text-base' />
          </Button>
          <Button
            color='light'
            size='sm'
            onClick={onClickExport}
          >
            <FaRedoAlt className='text-base' />
          </Button>
        </Button.Group>
      </div>
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
