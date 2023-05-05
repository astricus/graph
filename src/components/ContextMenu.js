import React from 'react';
import { ListGroup } from 'flowbite-react';

const ContextMenu = ({ x, y, nodeId = null }) => {
  if (!nodeId) {
    return null;
  }

  return (
    <div style={{ top: y, left: x }} className='absolute w-48'>
      <ListGroup>
        <ListGroup.Item
          active={true}
          onClick={function onClick() {
            return alert('Profile clicked!');
          }}
        >
          Remove
        </ListGroup.Item>
        <ListGroup.Item>Define</ListGroup.Item>
        <ListGroup.Item>Expand</ListGroup.Item>
        <ListGroup.Item>Focus</ListGroup.Item>
        <ListGroup.Item>Cluster</ListGroup.Item>
        <ListGroup.Item>Abstract</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ContextMenu;
