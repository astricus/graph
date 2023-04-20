import { useState } from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Sandbox from '../Graph';
import Modal from '../components/Modal';

export default function Homepage() {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(prev => !prev)
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <Header
        openLeft={openLeft}
        setOpenLeft={setOpenLeft}
        openRight={openRight}
        setOpenRight={setOpenRight}
        toggleModal={toggleModal}
      />
      <LeftSidebar open={openLeft} />
      <RightSidebar open={openRight} />
      <Modal show={show} onClose={toggleModal} />
      <Sandbox />
    </div>
  );
}
