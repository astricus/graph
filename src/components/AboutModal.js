import { Modal, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAboutModalOpen } from '../store/menu/menu.selectors';
import { setAboutModal } from '../store/menu/menu.actions';
import { useCallback } from 'react';

export default function AboutModal() {
  const dispatch = useDispatch();

  const show = useSelector(selectIsAboutModalOpen);
  const onClose = useCallback(
    () => dispatch(setAboutModal(false)),
    [dispatch]
  );

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>About</Modal.Header>
      <Modal.Body>
        <p className='mb-3'>
          ExpO: An Approach Towards Explaining Ontology-Driven Conceptual Models
        </p>
        <p className='mb-3'>
          Idea: Elena Romanenko, Diego Calvanese, Giancarlo Guizzardi
        </p>
        <p className='mb-3'>
          Developers:{' '}
          <a
            className='text-blue-700'
            href='https://github.com/mozzherina'
            rel='noopener noreferrer'
            target='_blank'
          >
            Elena Romanenko
          </a>
          ,{' '}
          <a
            className='text-blue-700'
            href='https://github.com/astricus'
            rel='noopener noreferrer'
            target='_blank'
          >
            Konstantin Romanenko
          </a>
        </p>
        <p className='mb-3'>
          If you would like to cite this work, please refer to the PURL{' '}
          <a
            className='text-blue-700'
            href='https://w3id.org/ExpO'
            rel='noopener noreferrer'
            target='_blank'
          >
            https://w3id.org/ExpO
          </a>{' '}
          and cite the paper: Romanenko, E., Calvanese, D., Guizzardi, G.: ExpO:
          An Approach Towards Explaining Ontology-Driven Conceptual Models.
          (2024) Manuscript submitted for publication.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color='gray' onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
