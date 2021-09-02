import { Modal } from '@material-ui/core';
import React from 'react';

export interface SimpleModalProps {
  children: JSX.Element;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const SimpleModal: React.FunctionComponent<SimpleModalProps> = (
  props: SimpleModalProps
) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {props.children}
    </Modal>
  );
};
