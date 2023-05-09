import { Button } from 'flowbite-react';
import React from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

export default function Pagination({ page, total, pageUp, pageDown }) {
  return (
    <div className='flex w-full'>
      <Button size='xs' className='mr-2' color='light' onClick={pageDown}>
        <HiOutlineArrowLeft />
      </Button>
      <Button size='xs' className='mr-2' color='light' onClick={pageUp}>
        <HiOutlineArrowRight />
      </Button>
      {page} of {total}
    </div>
  );
}
