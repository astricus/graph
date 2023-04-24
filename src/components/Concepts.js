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
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveNodesMap,
  selectNodes,
  selectPinnedNodesMap,
} from '../store/data/data.selectors';
import { setActiveNodes, setPinnedNodes } from '../store/data/data.actions';

export function usePagination(array = [], numPerPage = 10) {
  const [page, setPage] = useState(1);
  const total = Math.ceil(array.length / numPerPage) || 1;

  const pageUp = () => {
    if (page < total) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const pageDown = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const firstIdx = (page - 1) * numPerPage;
  const lastIdx = Math.min(page * numPerPage, array.length);

  const slice = useMemo(() => {
    return array.slice(firstIdx, lastIdx);
  }, [array, firstIdx, lastIdx]);

  return { page, total, setPage, pageUp, pageDown, slice };
}

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
  const [search, setSearch] = useState('');
  const nodes = useSelector(selectNodes);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const filteredNodes = useMemo(() => {
    if (!search) {
      return nodes;
    }
    return nodes.length > 0
      ? nodes.filter(
          ({ name }) =>
            typeof name === 'string' &&
            typeof search === 'string' &&
            name.trim().toLowerCase().includes(search.trim().toLowerCase())
        )
      : [];
  }, [nodes, search]);

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
        <Button className='ml-auto mr-2' size='sm' color='light'>
          <HiSortAscending />
        </Button>
        <Button size='sm' color='light'>
          <HiSortDescending />
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
      <div className='flex w-full'>
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
