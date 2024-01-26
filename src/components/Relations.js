import { useMemo } from 'react';
import { TextInput } from 'flowbite-react';
import React from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectLinks } from '../store/data/data.selectors';
import { setRelations } from '../store/menu/menu.actions';
import { selectRelationFilters } from '../store/menu/menu.selectors';
import { usePagination } from '../hooks/usePagination';
import { selectShowStereotype } from '../store/settings/settings.selectors';
import { useFilters } from '../hooks/useFilters';
import Pagination from './Pagination';
import SidebarSectionHeader from './SidebarSectionHeader';

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

  const { page, total, pageUp, pageDown, slice } = usePagination(
    filteredLinks,
    10
  );

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
    <div className='mt-auto'>
      <SidebarSectionHeader
        section='Relations'
        sort={sort}
        changeSort={changeSort}
      />
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
      <Pagination
        page={page}
        total={total}
        pageUp={pageUp}
        pageDown={pageDown}
      />
    </div>
  );
}
