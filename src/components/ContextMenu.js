import React from 'react';
import { ListGroup } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { cluster, define, expand, focus, remove } from '../store/data/data.actions';

const ContextMenu = ({ x, y, node = null }) => {
  const dispatch = useDispatch();
  if (!node) {
    return null;
  }
  const { id: nodeId, name } = node;

  const onRemove = () => {
    if (!nodeId) return;
    dispatch(remove(nodeId, 'node'));
  };

  const onDefine = () => {
    if (!name) return;
    dispatch(define(name));
  };

  const onExpand = () => {
    if (!nodeId) return;
    dispatch(expand(nodeId));
  };

  const onFocus = () => {
    if (!nodeId) return;
    dispatch(focus(nodeId));
  };

  const onCluster = () => {
    if (!nodeId) return;
    dispatch(cluster(nodeId));
  };

  return (
    <div style={{ top: y, left: x }} className='absolute w-48'>
      <ListGroup>
        <ListGroup.Item onClick={onRemove}>Remove</ListGroup.Item>
        {name && <ListGroup.Item onClick={onDefine}>Define</ListGroup.Item>}
        <ListGroup.Item onClick={onExpand}>Expand</ListGroup.Item>
        <ListGroup.Item onClick={onFocus}>Focus</ListGroup.Item>
        <ListGroup.Item onClick={onCluster}>Cluster</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ContextMenu;
