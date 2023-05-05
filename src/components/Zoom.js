import React from 'react';
import { Label, RangeSlider } from 'flowbite-react';

const Zoom = () => {
  return (
    <div className='flex flex-col items-end -translate-y-2 mr-6'>
      <Label
        htmlFor='zoom-range'
        className='-mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'
        value='100%'
      />
      <RangeSlider className='w-56' id='zoom-range' />
    </div>
  );
};

export default Zoom;
