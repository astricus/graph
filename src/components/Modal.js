import { Modal, Button, Label, FileInput } from 'flowbite-react';

export default function LoadDataModal({ show, onClose }) {
  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header>Model Load</Modal.Header>
      <Modal.Body>
        <div id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Upload file' />
          </div>
          <FileInput
            id='file'
            helperText='A profile picture is useful to confirm your are logged into your account'
          />
        </div>
        {/* <div className='space-y-6'>
          <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply.
          </p>
          <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
            The European Union’s General Data Protection Regulation (G.D.P.R.)
            goes into effect on May 25 and is meant to ensure a common set of
            data rights in the European Union. It requires organizations to
            notify users as soon as possible of high-risk data breaches that
            could personally affect them.
          </p>
        </div> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {}}>I accept</Button>
        <Button color='gray' onClick={() => {}}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
