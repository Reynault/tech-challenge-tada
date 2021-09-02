import { Button } from '@material-ui/core';
import React from 'react';
import { SimpleGroupButton } from './simple-group-button';

export const CardGroupButton: React.FunctionComponent = () => {
  return (
    <SimpleGroupButton>
      <React.Fragment>
        <Button variant="contained">Play</Button>
        <Button color="primary" variant="contained">
          Update
        </Button>
        <Button color="secondary" variant="contained">
          Delete
        </Button>
      </React.Fragment>
    </SimpleGroupButton>
  );
};
