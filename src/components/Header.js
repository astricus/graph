import { Button, Dropdown, Navbar } from 'flowbite-react';
import cn from 'clsx';
import React from 'react';
import {
  HiOutlineAdjustments,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlineUpload,
} from 'react-icons/hi';
import { FaUndoAlt, FaRedoAlt, FaArrowDown } from 'react-icons/fa';
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux';
import {
  load,
  abstract,
  exportOrigin,
  setDataInitialState,
} from '../store/data/data.actions';
import {
  selectAbstractCount,
  selectIsRedoDisabled,
  selectIsUndoDisabled,
  selectOrigin,
} from '../store/data/data.selectors';
// import {
//   selectIsLeftSidebarOpen,
//   selectIsRightSidebarOpen,
// } from "../store/menu/menu.selectors";
import {
  setAboutModal,
  setDataModal,
  setSettingsModal,
  setMenuInitialState,
} from '../store/menu/menu.actions';
import { DEMO_URL, MAX_ABSTRACT_COUNT } from '../constants';
import { useCallback } from 'react';
// import { persistor } from '../store';
import { setSettingsInitialState } from '../store/settings/settings.actions';
import dataTypes from '../store/data/data.types';

export default function Header() {
  const dispatch = useDispatch();

  // const openLeft = useSelector(selectIsLeftSidebarOpen);
  // const openRight = useSelector(selectIsRightSidebarOpen);
  const isAbstractFull =
    useSelector(selectAbstractCount) === MAX_ABSTRACT_COUNT;

  const openDataLoadModal = useCallback(
    () => dispatch(setDataModal(true)),
    [dispatch]
  );
  const openSettingsModalOpen = useCallback(
    () => dispatch(setSettingsModal(true)),
    [dispatch]
  );
  const openAboutModalOpen = useCallback(
    () => dispatch(setAboutModal(true)),
    [dispatch]
  );

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

  const onClickClear = () => {
    dispatch(setDataInitialState());
    dispatch(setMenuInitialState());
    dispatch(setSettingsInitialState());
    dispatch(ActionCreators.clearHistory());
    // persistor.pause();
    // persistor
    //   .flush()
    //   .then(() => {
    //     return persistor.purge();
    //   })
    //   .finally(() => {
    //     return persistor.persist();
    //   });
  };

  const onClickExport = () => {
    if (!origin) return;
    dispatch(exportOrigin());
  };

  const onClickAbstract = (abstractType) => () => {
    if (!origin) return;
    dispatch(abstract(abstractType));
  };

  const onDemoLoad = async () => {
    const formData = new FormData();
    formData.append('url', DEMO_URL);
    await dispatch(load(formData));
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={cn(
        'absolute top-0 left-0 right-0 shadow-sm h-16 py-3 opacity-100'
        // {
        // 'ml-0': !openLeft,
        // 'ml-64': openLeft,
        // 'mr-0': !openRight,
        // 'mr-96': openRight,
        // 'opacity-20 pointer-events-none': openLeft || openRight,
        // }
      )}
    >
      <div className='flex min-w-fit w-6/12 mx-auto'>
        <Button className='mr-3 border-0' size='sm' onClick={openDataLoadModal}>
          <HiOutlineDownload className='mr-1 text-base' />
          Load
        </Button>
        <Dropdown
          label='Demo'
        >
          <Dropdown.Item onClick={onDemoLoad}>
            Library
          </Dropdown.Item>
        </Dropdown>
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
          onClick={openSettingsModalOpen}
        >
          <HiOutlineAdjustments className='mr-1 text-base' />
          Settings
        </Button>
        <Button
          className='mr-3 border-0'
          color='light'
          size='sm'
          onClick={openAboutModalOpen}
        >
          <HiOutlineInformationCircle className='mr-1 text-base' />
          About
        </Button>
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
        <div className='flex mr-3'>
          <Button
            title={
              isAbstractFull
                ? 'This models is already a full abstraction'
                : 'Abstract'
            }
            className='rounded-br-none rounded-tr-none'
            size='sm'
            onClick={onClickAbstract()}
            disabled={!origin || isAbstractFull}
          >
            Abstract
          </Button>
          <Dropdown
            renderTrigger={() => (
              <Button
                disabled={!origin || isAbstractFull}
                className='rounded-bl-none rounded-tl-none'
              >
                <FaArrowDown />
              </Button>
            )}
            disabled={!origin || isAbstractFull}
          >
            <Dropdown.Item onClick={onClickAbstract(dataTypes.ASPECTS)}>
              Aspects
            </Dropdown.Item>
            <Dropdown.Item onClick={onClickAbstract(dataTypes.HIERARCHY)}>
              Hierarchy
            </Dropdown.Item>
            <Dropdown.Item onClick={onClickAbstract(dataTypes.PARTHOOD)}>
              Parthood
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Button
          title='Clear'
          className='border-0'
          size='sm'
          onClick={onClickClear}
        >
          Clear
        </Button>
      </div>
      {/* <div className='flex md:order-2'>
        <Navbar.Toggle />
      </div> */}
    </Navbar>
  );
}
