import React from 'react';
import { Label, RangeSlider } from 'flowbite-react';
import { MAX_ZOOM, MIN_ZOOM } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectZoom } from '../store/settings/settings.selectors';
import { setZoom } from '../store/settings/settings.actions';

const Zoom = () => {
  const dispatch = useDispatch();
  const zoom = useSelector(selectZoom);
  const percentValue = `${Math.round(zoom * 100)}%`;
  const min = MIN_ZOOM;
  const max = MAX_ZOOM;

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setZoom(value));
  };
  return (
    <div className='flex flex-col items-end -translate-y-2 mr-6'>
      <Label
        htmlFor='zoom-range'
        className='-mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'
        value={percentValue}
      />
      <RangeSlider
        className='w-56'
        id='zoom-range'
        min={min}
        max={max}
        value={zoom}
        step={0.1}
        onInput={handleChange}
        // onChange={handleChange}
      />
    </div>
  );
};

export default Zoom;
