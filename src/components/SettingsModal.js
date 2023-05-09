// import { useState } from 'react';
import { Modal, Button, Label, Radio, Checkbox, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSettingsModalOpen } from '../store/menu/menu.selectors';
import { toggleSettingsModal } from '../store/menu/menu.actions';
import { selectSettings } from '../store/settings/settings.selectors';
import {
  setAbstractType,
  setDefinitionsNumber,
  setHop,
} from '../store/settings/settings.actions';
import { setShowStereotype } from '../store/settings/settings.actions';

export default function SettingsModal() {
  const dispatch = useDispatch();

  const settings = useSelector(selectSettings);
  const {
    hop,
    definitionsNumber,
    abstractType,
    showStereotype,
    // showColor,
    // selectionColor,
  } = settings;

  const show = useSelector(selectIsSettingsModalOpen);
  const onClose = () => dispatch(toggleSettingsModal());

  const changeShowStereotype = () => {
    dispatch(setShowStereotype(!showStereotype));
  };

  const changeHopFocus = (e) => {
    const { value } = e.target;
    dispatch(setHop(+value));
  };

  const changeDefinitionsNumber = (e) => {
    const { value } = e.target;
    dispatch(setDefinitionsNumber(+value));
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal size='md' dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>Settings</Modal.Header>
      <Modal.Body>
        <div className='flex items-center gap-2 mb-6'>
          <Checkbox
            id='promotion'
            name='showStereotype'
            checked={showStereotype}
            onChange={changeShowStereotype}
          />
          <Label htmlFor='promotion'>Show stereotype</Label>
        </div>
        <div className='mb-10'>
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
            <Label>Abstract to the top concept</Label>
          </div>
        </div>
        <div className='flex gap-x-4 w-full'>
          <div className='w-full'>
            <div className='mb-2 block'>
              <Label value='Hop focus' />
            </div>
            <Select value={hop} onChange={changeHopFocus} required={true}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Select>
          </div>
          <div className='w-full'>
            <div className='mb-2 block'>
              <Label value='Number of definitions' />
            </div>
            <Select
              value={definitionsNumber}
              onChange={changeDefinitionsNumber}
              required={true}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Select>
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
