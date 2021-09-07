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

/**
 * Three buttons to play, delete and update the current challenge
 * @param challenge managed
 */
export const ManageOneChallengeButtons: React.FunctionComponent<ManageOneChallengeButtons> = ({
  challenge
}) => {
  const { showDialog } = useContext(DialogContext);
  const { flexButtons } = globalStyles();
  // open update dialog
  const openUpdateDialog = useCallback(() => {
    showDialog(<UpdateChallengeForm {...{ challenge }} />);
  }, [showDialog, challenge]);
  // open delete dialog
  const openDeleteDialog = useCallback(() => {
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
      <Button onClick={openUpdateDialog} color="primary" variant="outlined">
        Update
      </Button>
      <Button onClick={openDeleteDialog} color="secondary" variant="outlined">
        Delete
      </Button>
    </Box>
  );
};
