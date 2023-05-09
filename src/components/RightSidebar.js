import cn from 'clsx';
import Constraints from './Constraints';
import { useSelector } from 'react-redux';
import { selectIsRightSidebarOpen } from '../store/menu/menu.selectors';

export default function RightSidebar() {
  const open = useSelector(selectIsRightSidebarOpen);
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
      </aside>
    </div>
  );
}
