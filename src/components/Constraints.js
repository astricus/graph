import { useMemo } from 'react';
import { TextInput } from 'flowbite-react';
import React from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstraints } from '../store/data/data.selectors';
import { selectConstaintFilters } from '../store/menu/menu.selectors';
import { setConstraints } from '../store/menu/menu.actions';
import { usePagination } from '../hooks/usePagination';
import { useFilters } from '../hooks/useFilters';
import Pagination from './Pagination';

const Constraint = ({ constraint }) => {
  return (
    <div className='flex w-full items-center'>
      <p className='mr-2 mb-2'>{constraint}</p>
    </div>
  );
};

export default function Constraints() {
  const dispatch = useDispatch();
  const constraints = useSelector(selectConstraints);
  const constraintFilters = useSelector(selectConstaintFilters);
  const { search } = constraintFilters;

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    dispatch(setConstraints({ ...constraintFilters, search: value }));
  };

  const filteredConstraints = useFilters(constraints, constraintFilters);

  const { page, total, pageUp, pageDown, slice } = usePagination(
    filteredConstraints,
    10
  );

  const constraintSlice = useMemo(() => {
    return (
      <div className='mb-2 max-h-full overflow-auto'>
        {slice.length > 0 &&
          slice.map((constraint) => (
            <Constraint key={constraint} constraint={constraint} />
          ))}
      </div>
    );
  }, [slice]);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex mb-3'>
        <b>Constraints</b>
      </div>
      <TextInput
        className='mb-2'
        type='search'
        icon={HiSearch}
        placeholder='Quick search for constraint'
        value={search}
        onChange={handleChangeSearch}
      />
      {constraintSlice}
      <Pagination
        page={page}
        total={total}
        pageUp={pageUp}
        pageDown={pageDown}
      />
    </div>
  );
}
