import { Button, DialogActions } from '@material-ui/core';
import React, { useCallback } from 'react';
import { SimpleGroupButton } from './simple-group-button';

export interface DialogGroupButtonProps {
  setOpen: (value: boolean) => void;
}

export const DialogGroupButton: React.FunctionComponent<DialogGroupButtonProps> = ({
  setOpen
}) => {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  return (
    <SimpleGroupButton>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </SimpleGroupButton>
  );
};
