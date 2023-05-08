import { useState } from 'react';
import {
  Modal,
  Button,
  Label,
  FileInput,
  Spinner,
  TextInput,
  Radio,
} from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../store/data/data.actions';
import { selectIsDataModalOpen } from '../store/menu/menu.selectors';
import { toggleDataModal } from '../store/menu/menu.actions';

export default function LoadDataModal() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('url'); // or 'file'
  const [url, setUrl] = useState(
    'https://raw.githubusercontent.com/OntoUML/ontouml-models/master/models/abrahao2018agriculture-operations/ontology.json'
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const show = useSelector(selectIsDataModalOpen);
  const onClose = () => dispatch(toggleDataModal());

  const onChangeUrl = (event) => {
    const { value } = event.target;
    setUrl(value);
  };

  const onChangeFile = (event) => {
    if (event?.target?.files) {
      const firstFile = event.target.files[0];
      setFile(firstFile);
    }
  };

  const closeModal = () => {
    setFile(null);
    onClose();
  };

  const onSubmit = async () => {
    if (mode === 'url' && url) {
      setLoading(true);
      const formData = new FormData();
      formData.append('url', url);
      const result = await dispatch(load(formData));
      setLoading(false);
      if (result) {
        closeModal();
      }
    }
    if (mode === 'file' && file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const result = await dispatch(load(formData));
      setLoading(false);
      if (result) {
        closeModal();
      }
    }
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>Model Load</Modal.Header>
      <Modal.Body>
        <div id='urlUpload' className='mb-10'>
          <div className='flex items-center gap-2 mb-2'>
            <Radio
              name='mode-url'
              value='USA'
              checked={mode === 'url'}
              onChange={() => setMode('url')}
            />
            <Label htmlFor='united-state'>URL to the json file</Label>
          </div>
          <TextInput
            id='urlData'
            placeholder='Paste the link to the json file here'
            value={url}
            onChange={onChangeUrl}
            disabled={mode !== 'url'}
          />
        </div>
        <div id='fileUpload'>
          <div className='flex items-center gap-2 mb-2'>
            <Radio
              name='mode-file'
              checked={mode === 'file'}
              onChange={() => setMode('file')}
            />
            <Label htmlFor='united-state'>*.json file</Label>
          </div>
          <FileInput
            id='file'
            accept='.json'
            onChange={onChangeFile}
            disabled={mode !== 'file'}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>
          {loading && (
            <Spinner className='mr-3' aria-label='Default status example' />
          )}
          Upload
        </Button>
        <Button color='gray' onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
