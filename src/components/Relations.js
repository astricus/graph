import { useMemo } from 'react';
import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import {
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSwitchVertical,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectLinks } from '../store/data/data.selectors';
import { setRelations } from '../store/menu/menu.actions';
import { selectRelationFilters } from '../store/menu/menu.selectors';
import { usePagination } from '../hooks/usePagination';
import { selectShowStereotype } from '../store/settings/settings.selectors';
import clsx from 'clsx';
import { useFilters } from '../hooks/useFilters';

const Relation = ({ relation }) => {
  return (
    <div className='flex w-full items-center'>
      <p className='truncate mr-2'>{relation}</p>
    </div>
  );
};

export default function Relations() {
  const links = useSelector(selectLinks);
  const dispatch = useDispatch();
  const showStereotype = useSelector(selectShowStereotype);
  const relationFilters = useSelector(selectRelationFilters);
  const { sort, search } = relationFilters;

  /**
   * @param {'nameAsc' | 'nameDesc' | 'stereotype'} sort
   */
  const changeSort = (sort) => {
    dispatch(setRelations({ ...relationFilters, sort }));
  };

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    dispatch(setRelations({ ...relationFilters, search: value }));
  };

  const filteredLinks = useFilters(links, relationFilters);

  const { page, total, pageUp, pageDown, slice } = usePagination(filteredLinks, 10);

  const linksSlice = useMemo(() => {
    return (
      <div className='mb-2 h-60'>
        {slice.length > 0 &&
          slice.map(({ id, name, fullName }) => {
            const relation = showStereotype ? fullName : name;
            return <Relation key={id} relation={relation} />;
          })}
      </div>
    );
  }, [slice, showStereotype]);

  return (
    <div>
      <div className='flex mb-3'>
        <b>Relations</b>
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
        placeholder='Quick search for relation'
        value={search}
        onChange={handleChangeSearch}
        required={true}
      />
      <div className='mb-2'>{linksSlice}</div>
      <div className='flex w-full'>
        <Button size='sm' className='mr-2' color='light' onClick={pageDown}>
          <HiOutlineArrowLeft />
        </Button>
        <Button size='sm' className='mr-2' color='light' onClick={pageUp}>
          <HiOutlineArrowRight />
        </Button>
        {page} of {total}
      </div>
    </div>
  );
}
