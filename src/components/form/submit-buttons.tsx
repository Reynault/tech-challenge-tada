import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { DialogContext } from '../../contexts/dialog-context';

/**
 * Buttons used to submit or cancel a form
 */
export const SubmitButtons: React.FunctionComponent = () => {
  const { hideDialog } = useContext(DialogContext);
  return (
    <>
      <Button onClick={hideDialog} color="secondary" variant="contained">
        Cancel
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </>
  );
};
