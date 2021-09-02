import { DialogTitle } from '@material-ui/core';
import React from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { DialogGroupButton } from '../bouton/dialog-group-button';
import { SimpleDialog } from '../dialog/simple-dialog';

export interface DeleteChallengeFormProps {
  challengeToDelete?: ChallengeDto;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DeleteChallengeForm: React.FunctionComponent<DeleteChallengeFormProps> = ({
  challengeToDelete,
  open,
  setOpen
}) => {
  return (
    <SimpleDialog {...{ open, setOpen }}>
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          Do you really want to delete
          {challengeToDelete?.name
            ? challengeToDelete.name
            : ' every challenge'}
          ?
        </DialogTitle>
        <DialogGroupButton setOpen={setOpen} />
      </React.Fragment>
    </SimpleDialog>
  );
};
