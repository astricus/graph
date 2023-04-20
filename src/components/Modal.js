import { useState } from 'react';
import { Modal, Button, Label, FileInput, Spinner } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { loadData } from '../store/data/data.actions';

export default function LoadDataModal({ show, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onChange = (event) => {
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
    // if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const result = await dispatch(loadData(formData));
      if (result) {
        closeModal();
      }
    // }
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header className='p-5'>Model Load</Modal.Header>
      <Modal.Body>
        <div id='fileUpload'>
          {/* <div className='mb-2 block'>
            <Label htmlFor='file' value='Upload file' />
          </div> */}
          {/* <FileInput
            id='file'
            accept='.json'
            onChange={onChange}
            helperText='Choose json file to upload'
          /> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button outline  onClick={onSubmit}>
          {loading && <Spinner className='mr-3' aria-label="Default status example" />}
          Upload
        </Button>
        <Button color='gray' onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
