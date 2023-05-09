// import { useState } from 'react';
import {
  Modal,
  Button,
  Label,
  Radio,
} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSettingsModalOpen } from '../store/menu/menu.selectors';
import { toggleSettingsModal } from '../store/menu/menu.actions';
import { selectSettings } from '../store/settings/settings.selectors';
import { setAbstractType } from '../store/settings/settings.actions';

export default function SettingsModal() {
  const dispatch = useDispatch();

  const settings = useSelector(selectSettings);
  const {
    // hop,
    // definitionsNumber,
    abstractType,
    // showStereotype,
    // showColor,
    // selectionColor,
  } = settings;

  const show = useSelector(selectIsSettingsModalOpen);
  const onClose = () => dispatch(toggleSettingsModal());

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>Settings</Modal.Header>
      <Modal.Body>
        <div id='urlUpload' className='mb-10'>
          <div className='flex items-center gap-2 mb-2'>
            <Radio
              name='abstractType'
              checked={abstractType === 'kind'}
              onChange={() => dispatch(setAbstractType('kind'))}
            />
            <Label>Abstract to the Kind</Label>
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <Radio
              name='abstractType'
              checked={abstractType === 'topConcept'}
              onChange={() => dispatch(setAbstractType('topConcept'))}
            />
            <Label>Abstract to the Kind</Label>
          </div>
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
