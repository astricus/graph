import { Button, Navbar } from 'flowbite-react';
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
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux';
import { abstract, exportOrigin } from '../store/data/data.actions';
import {
  selectIsRedoDisabled,
  selectIsUndoDisabled,
  selectOrigin,
} from '../store/data/data.selectors';
import Zoom from './Zoom';

export default function Header({
  openLeft,
  openRight,
  setOpenLeft,
  // setOpenRight,
  toggleModal,
}) {
  const dispatch = useDispatch();

  const isUndoDisabled = useSelector(selectIsUndoDisabled);
  const isRedoDisabled = useSelector(selectIsRedoDisabled);
  const origin = useSelector(selectOrigin);

  const onClickUndo = () => {
    if (isUndoDisabled) return;
    dispatch(ActionCreators.undo());
  };

  const onClickRedo = () => {
    if (isRedoDisabled) return;
    dispatch(ActionCreators.redo());
  };

  const onClickExport = () => {
    if (!origin) return;
    dispatch(exportOrigin());
  };

  const onClickAbstract = () => {
    if (!origin) return;
    dispatch(abstract());
  };

  const toggleOpenLeft = () => setOpenLeft((prev) => !prev);
  // const toggleOpenRight = () => setOpenRight((prev) => !prev);
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
        <Button className='mr-3 border-0' size='sm' onClick={toggleModal}>
          <HiOutlineDownload className='mr-1 text-base' />
          Load
        </Button>
        <Button
          className='mr-3 border-0'
          color='light'
          size='sm'
          onClick={onClickExport}
          disabled={!origin}
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
        <Zoom />
        <Button.Group className='mr-3'>
          <Button
            className='border-0'
            color='light'
            size='sm'
            title='Undo'
            disabled={isUndoDisabled}
            onClick={onClickUndo}
          >
            <FaUndoAlt className='text-base' />
          </Button>
          <Button
            className='border-0'
            title='Redo'
            color='light'
            size='sm'
            disabled={isRedoDisabled}
            onClick={onClickRedo}
          >
            <FaRedoAlt className='text-base' />
          </Button>
        </Button.Group>
        <Button
          className='border-0'
          size='sm'
          onClick={onClickAbstract}
          disabled={!origin}
        >
          Abstract
        </Button>
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
