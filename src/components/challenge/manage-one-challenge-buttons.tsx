import { Box, Button } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DialogContext } from '../../contexts/dialog-context';
import { Routes } from '../../shared/constants/routes';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { DeleteChallengeForm } from '../form/delete-challenge-form';
import { UpdateChallengeForm } from '../form/update-challenge-form';

export interface ManageOneChallengeButtons {
  challenge: ChallengeDto;
}

export const ManageOneChallengeButtons: React.FunctionComponent<ManageOneChallengeButtons> = ({
  challenge
}) => {
  const { showDialog } = useContext(DialogContext);
  const { flexButtons } = globalStyles();

  const openUpdateModal = useCallback(() => {
    showDialog(<UpdateChallengeForm {...{ challenge }} />);
  }, [showDialog, challenge]);
  const openDeleteModal = useCallback(() => {
    showDialog(<DeleteChallengeForm {...{ challenge }} />);
  }, [showDialog, challenge]);
  return (
    <Box p={1} className={flexButtons}>
      <Button
        variant="outlined"
        component={Link}
        to={`${Routes.PLAY_SELECTION}/${challenge.name}`}
      >
        Play
      </Button>
      <Button onClick={openUpdateModal} color="primary" variant="outlined">
        Update
      </Button>
      <Button onClick={openDeleteModal} color="secondary" variant="outlined">
        Delete
      </Button>
    </Box>
  );
};
