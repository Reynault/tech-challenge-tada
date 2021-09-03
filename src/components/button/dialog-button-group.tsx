import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';

export interface DialogGroupButtonProps {
  cancelProcedure: () => any;
  submitProcedure: () => any;
}

export const DialogButtonGroup: React.FunctionComponent<DialogGroupButtonProps> = ({
  cancelProcedure,
  submitProcedure
}) => {
  const handleCancel = useCallback(() => {
    cancelProcedure();
  }, [cancelProcedure]);
  const handleSubmit = useCallback(() => {
    submitProcedure();
  }, [submitProcedure]);
  return (
    <React.Fragment>
      <Button onClick={handleCancel} color="secondary" variant="contained">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary" variant="contained">
        Submit
      </Button>
    </React.Fragment>
  );
};
