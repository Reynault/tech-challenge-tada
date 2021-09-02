import { Dialog } from '@material-ui/core';
import React from 'react';

export interface SimpleModalProps {
  children: JSX.Element;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const SimpleDialog: React.FunctionComponent<SimpleModalProps> = ({
  children,
  open,
  setOpen
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};
