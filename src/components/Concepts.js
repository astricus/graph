import { useState, useMemo } from 'react';
import { Button, TextInput } from 'flowbite-react';
import clsx from 'clsx';
import React from 'react';
import {
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiOutlinePaperClip,
  HiOutlineCursorClick,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSwitchVertical,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveNodesMap,
  selectNodes,
  selectPinnedNodesMap,
} from '../store/data/data.selectors';
import { setActiveNodes, setPinnedNodes } from '../store/data/data.actions';
import { selectConcepts } from '../store/menu/menu.selectors';
import { setConcepts } from '../store/menu/menu.actions';
import { usePagination } from '../hooks/usePagination';
import { useFilters } from '../hooks/useFilters';

const Concept = ({ id, name, isPinned = false, isActive = false }) => {
  const dispatch = useDispatch();
  const togglePinNode = () => {
    dispatch(setPinnedNodes(id));
  };
  const toggleActiveNode = () => {
    dispatch(setActiveNodes(id));
  };
  return (
    <div className='flex w-full items-center'>
      <HiOutlinePaperClip
        className={clsx(
          'mr-2 hover:cursor-pointer hover:text-black transition-colors',
          { 'text-gray-300': !isPinned }
        )}
        onClick={togglePinNode}
      />
      <p className='truncate mr-2'>{name}</p>
      <HiOutlineCursorClick
        className={clsx(
          'ml-auto hover:cursor-pointer hover:text-black transition-colors',
          { 'text-gray-300': !isActive }
        )}
        onClick={toggleActiveNode}
      />
    </div>
  );
};

export default function Concepts() {
  const dispatch = useDispatch();
  const concepts = useSelector(selectConcepts);
  const { sort, search } = concepts;

  /**
   * @param {'nameAsc' | 'nameDesc' | 'stereotype'} sort
   */
  const changeSort = (sort) => {
    dispatch(setConcepts({ ...concepts, sort }));
  };

  const nodes = useSelector(selectNodes);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    dispatch(setConcepts({ ...concepts, search: value }));
  };

  const filteredNodes = useFilters(nodes, concepts);

  const pinnedNodes = useSelector(selectPinnedNodesMap);
  const activeNodes = useSelector(selectActiveNodesMap);
  const { page, total, pageUp, pageDown, slice } = usePagination(
    filteredNodes,
    10
  );

  const conceptsSlice = useMemo(() => {
    return (
      <div className='mb-2 h-60'>
        {slice.length > 0 &&
          slice.map(({ id, name }) => {
            const isPinned = pinnedNodes ? pinnedNodes[id] || false : false;
            const isActive = activeNodes ? activeNodes[id] || false : false;
            return (
              <Concept
                key={id}
                id={id}
                name={name}
                isActive={isActive}
                isPinned={isPinned}
              />
            );
          })}
      </div>
    );
  }, [slice, pinnedNodes, activeNodes]);

  return (
    <div className='mb-5'>
      <div className='flex mb-3'>
        <b>Concepts</b>
        <Button
          outline
          className={clsx('ml-auto mr-2 transition-colors', {
            '!border-blue-700': sort === 'nameAsc',
          })}
          size='xs'
          color='light'
          onClick={() => changeSort('nameAsc')}
        >
          <HiSortAscending
            className={clsx('text-base transition-colors', {
              'text-blue-700': sort === 'nameAsc',
            })}
          />
        </Button>
        <Button
          outline
          className={clsx('mr-2', { '!border-blue-700': sort === 'nameDesc' })}
          size='xs'
          color='light'
          onClick={() => changeSort('nameDesc')}
        >
          <HiSortDescending
            className={clsx('text-base transition-colors', {
              'text-blue-700': sort === 'nameDesc',
            })}
          />
        </Button>
        <Button
          outline
          className={clsx({ '!border-blue-700': sort === 'stereotype' })}
          size='xs'
          color='light'
          onClick={() => changeSort('stereotype')}
        >
          <HiOutlineSwitchVertical
            className={clsx('text-base transition-colors', {
              'text-blue-700': sort === 'stereotype',
            })}
          />
        </Button>
      </div>
      <TextInput
        className='mb-2'
        type='search'
        icon={HiSearch}
        placeholder='Quick search for concept'
        value={search}
        onChange={handleChangeSearch}
      />
      {conceptsSlice}
      <div className='flex w-full items-center'>
        <Button
          size='sm'
          className='mr-2'
          color='light'
          onClick={pageDown}
          disabled={page < 2}
        >
          <HiOutlineArrowLeft />
        </Button>
        <Button
          size='sm'
          className='mr-2'
          color='light'
          onClick={pageUp}
          disabled={page > total - 1}
        >
          <HiOutlineArrowRight />
        </Button>
        {page} of {total}
      </div>
    </div>
  );
}
