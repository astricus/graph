import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Sandbox from '../Graph';
import LoadDataModal from '../components/LoadDataModal';
import { useSelector } from 'react-redux';
import { selectIsLeftSidebarOpen, selectIsRightSidebarOpen } from '../store/menu/menu.selectors';

export default function Homepage() {
  const openLeft = useSelector(selectIsLeftSidebarOpen);
  const openRight = useSelector(selectIsRightSidebarOpen);
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <Header />
      <LeftSidebar open={openLeft} />
      <RightSidebar open={openRight} />
      <LoadDataModal />
      <Sandbox />
    </div>
  );
}
