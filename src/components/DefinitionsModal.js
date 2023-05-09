// import { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDefinitionsModalOpen } from '../store/menu/menu.selectors';
import { toggleDefinitionsModal } from '../store/menu/menu.actions';
import { selectDefinitions, selectDefinitionsConcept } from '../store/data/data.selectors';

export default function DefinitionsModal() {
  const dispatch = useDispatch();

  const concept = useSelector(selectDefinitionsConcept);
  const definitions = useSelector(selectDefinitions);

  const show = useSelector(selectIsDefinitionsModalOpen);
  const onClose = () => dispatch(toggleDefinitionsModal());

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>Definitions</Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-4 mb-6'>
          <h2 className='text-xl font-bold'>{concept} is:</h2>
          <ul>
            {definitions.map((definition, idx) => <li className='mb-2' key={idx}>{definition}</li>)}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color='gray' onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
