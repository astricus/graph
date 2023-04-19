import { useState } from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

export default function Homepage() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  return (
    <div className='relative w-screen h-screen'>
      <Header
        openLeft={openLeft}
        setOpenLeft={setOpenLeft}
        openRight={openRight}
        setOpenRight={setOpenRight}
      />
      <LeftSidebar open={openLeft} />
      <RightSidebar open={openRight} />
    </div>
  );
}
