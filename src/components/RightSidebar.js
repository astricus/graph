import cn from 'clsx';
import Constraints from './Constraints';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRightSidebarOpen } from '../store/menu/menu.selectors';
import { toggleRightSidebar } from '../store/menu/menu.actions';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { Button } from 'flowbite-react';

export default function RightSidebar() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsRightSidebarOpen);
  const toggleOpenRight = () => dispatch(toggleRightSidebar());
  return (
    <div>
      <aside
        id='default-sidebar'
        className={cn(
          'absolute top-0 right-0 z-40 w-96 h-screen transition-transform',
          { 'translate-x-full': !open, 'translate-x-0': open }
        )}
        aria-label='Sidenav'
      >
        <div className='overflow-y-auto py-5 px-3 h-full bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <Constraints />
        </div>
        <Button
          className='absolute top-24 -left-12 border-0'
          color='light'
          size='sm'
          onClick={toggleOpenRight}
        >
          {open ? <RxCross1 /> : <RxHamburgerMenu />}
        </Button>
      </aside>
    </div>
  );
}
