import cn from 'clsx';
import Concepts from './Concepts';
import Relations from './Relations';
import { useSelector } from 'react-redux';
import { selectIsLeftSidebarOpen } from '../store/menu/menu.selectors';

export default function LeftSidebar() {
  const open = useSelector(selectIsLeftSidebarOpen);
  return (
    <div>
      <aside
        id='default-sidebar'
        className={cn(
          'absolute top-0 left-0 z-40 w-64 h-screen transition-transform',
          { '-translate-x-full': !open, 'translate-x-0': open }
        )}
        aria-label='Sidenav'
      >
        <div className='flex flex-col overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <Concepts />
          <Relations />
        </div>
      </aside>
    </div>
  );
}
