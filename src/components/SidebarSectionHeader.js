import clsx from 'clsx';
import { Button } from 'flowbite-react';
import React from 'react';
import {
  HiOutlineSwitchVertical,
  HiSortAscending,
  HiSortDescending,
} from 'react-icons/hi';

export default function SidebarSectionHeader({ section, sort, changeSort }) {
  return (
    <div className='flex mb-3'>
      <b>{section}</b>
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
  );
}
