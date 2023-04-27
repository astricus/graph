import { useState } from 'react';
import {
  Modal,
  Button,
  Label,
  FileInput,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { loadData } from '../store/data/data.actions';

export default function LoadDataModal({ show, onClose }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('https://raw.githubusercontent.com/OntoUML/ontouml-models/master/models/abrahao2018agriculture-operations/ontology.json');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    if (url) {
      setLoading(true);
      const formData = new FormData();
      formData.append('url', url);
      formData.append('in_format', 'json');
      formData.append('out_format', 'expo');
      const result = await dispatch(loadData({
        url
      }));
      setLoading(false);
      if (result) {
        closeModal();
      }
    }
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const result = await dispatch(loadData(formData));
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
        <div id='urlUpload'>
          <div className='mb-2 block'>
            <Label
              htmlFor='urlData'
              value='Insert the url to the model json file'
            />
          </div>
          <TextInput
            id='urlData'
            helperText='Json url'
            value={url}
            onChange={onChangeUrl}
          />
        </div>
        <div id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Upload file' />
          </div>
          <FileInput
            id='file'
            accept='.json'
            onChange={onChangeFile}
            helperText='Choose json file to upload'
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button outline onClick={onSubmit}>
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
