import { DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { DialogGroupButton } from '../bouton/dialog-group-button';
import { SimpleDialog } from '../dialog/simple-dialog';

export interface InsertChallengeFormProps {
  challenge?: ChallengeDto;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const InsertChallengeForm: React.FunctionComponent<InsertChallengeFormProps> = ({
  challenge,
  open,
  setOpen
}) => {
  const classes = globalStyles();
  return (
    <SimpleDialog {...{ open, setOpen }}>
      <React.Fragment>
        <DialogTitle className={classes.centeredTitle} id="alert-dialog-title">
          {!!challenge?.name
            ? `Update ${challenge.name}`
            : 'Insert a challenge'}
        </DialogTitle>
        <DialogContent>
          <form className={classes.spacedForm} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              value={!!challenge?.name ? challenge.name : ''}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              maxRows={4}
              value={!!challenge?.description ? challenge.description : ''}
              variant="filled"
            />
            <TextField
              id="text"
              label="Text"
              multiline
              maxRows={4}
              value={!!challenge?.text ? challenge.text : ''}
              variant="filled"
            />
            <TextField id="difficulty" label="Difficulty" />
          </form>
        </DialogContent>
        <DialogGroupButton setOpen={setOpen} />
      </React.Fragment>
    </SimpleDialog>
  );
};
