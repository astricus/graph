import { useMemo } from 'react';
import { TextInput } from 'flowbite-react';
import clsx from 'clsx';
import React from 'react';
import {
  HiSearch,
  HiOutlinePaperClip,
  HiOutlineCursorClick,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveNodesMap,
  selectNodes,
  selectPinnedNodesMap,
} from '../store/data/data.selectors';
import {
  clickNode,
  /* setActiveNodes, */ setPinnedNodes,
} from '../store/data/data.actions';
import { selectConcepts } from '../store/menu/menu.selectors';
import { setConcepts } from '../store/menu/menu.actions';
import { usePagination } from '../hooks/usePagination';
import { useFilters } from '../hooks/useFilters';
import Pagination from './Pagination';
import SidebarSectionHeader from './SidebarSectionHeader';
import { useCallback } from 'react';

const Concept = ({ node, isPinned = false, isActive = false }) => {
  const { id, name } = node;
  const dispatch = useDispatch();
  const togglePinNode = useCallback(() => {
    dispatch(setPinnedNodes(id));
  }, [dispatch, id]);
  const toggleActiveNode = () => {
    // dispatch(setActiveNodes(id));
    dispatch(clickNode(node));
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
          slice.map((node) => {
            const { id } = node;
            const isPinned = pinnedNodes ? pinnedNodes[id] || false : false;
            const isActive = activeNodes ? activeNodes[id] || false : false;
            return (
              <Concept
                key={id}
                node={node}
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
      <SidebarSectionHeader
        section='Concepts'
        sort={sort}
        changeSort={changeSort}
      />
      <TextInput
        className='mb-2'
        type='search'
        icon={HiSearch}
        placeholder='Quick search for concept'
        value={search}
        onChange={handleChangeSearch}
      />
      {conceptsSlice}
      <Pagination
        page={page}
        total={total}
        pageUp={pageUp}
        pageDown={pageDown}
      />
    </div>
  );
}
