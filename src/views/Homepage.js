import { useState } from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Sandbox from '../Graph';

export default function Homepage() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <Header
        openLeft={openLeft}
        setOpenLeft={setOpenLeft}
        openRight={openRight}
        setOpenRight={setOpenRight}
      />
      <LeftSidebar open={openLeft} />
      <RightSidebar open={openRight} />
      <Sandbox />
    </div>
  );
}
