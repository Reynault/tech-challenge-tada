import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { DialogContext } from '../../contexts/dialog-context';

export const SubmitButtons: React.FunctionComponent = () => {
  const { hideModal } = useContext(DialogContext);
  return (
    <>
      <Button onClick={hideModal} color="secondary" variant="contained">
        Cancel
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </>
  );
};
