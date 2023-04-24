import { useState, useMemo } from 'react';
import { Button, TextInput } from 'flowbite-react';
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
import { useSelector } from 'react-redux';
import { selectNodes } from '../store/data/data.selectors';

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

const Concept = ({ name }) => {
  return (
    <div className='flex w-full items-center'>
      <HiOutlinePaperClip className='mr-2 hover:cursor-pointer' />
      <p className='truncate mr-2'>{name}</p>
      <HiOutlineCursorClick className='ml-auto' />
    </div>
  );
};

export default function Relations() {
  const nodes = useSelector(selectNodes);
  const { page, total, setPage, pageUp, pageDown, slice } = usePagination(
    nodes,
    10
  );
  return (
    <div>
      <div className='flex mb-3'>
        <b>Relations</b>
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
        required={true}
      />
      <div className='mb-2'>
        {slice.length > 0 &&
          slice.map(({ name }) => <Concept key='name' name={name} />)}
      </div>
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
