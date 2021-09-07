import { Box, Fab, makeStyles, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useContext } from 'react';
import { DialogContext } from '../../contexts/dialog-context';
import { DeleteChallengeForm } from '../form/delete-challenge-form';
import { UpdateChallengeForm } from '../form/update-challenge-form';

const buttonsStyle = makeStyles({
  favGroup: {
    right: '1%',
    bottom: '15px',
    left: 'auto',
    top: 'auto',
    position: 'fixed'
  },
  fav: {
    marginRight: '5px'
  }
});

/**
 * Buttons used to manage the list of challenges (insert and delete all)
 */
export const ManageChallengesButtons: React.FunctionComponent = () => {
  const { fav, favGroup } = buttonsStyle();
  // dialog context that provides a method to show it
  const { showDialog } = useContext(DialogContext);
  // dialog to create a challenge
  const openCreateDialog = useCallback(() => {
    showDialog(<UpdateChallengeForm />);
  }, [showDialog]);
  // dialog to delete all challenges
  const openDeleteDialog = useCallback(() => {
    showDialog(<DeleteChallengeForm />);
  }, [showDialog]);

  return (
    <Box className={favGroup}>
      <Tooltip title="Add a challenge" aria-label="add">
        <Fab
          className={fav}
          color="primary"
          aria-label="add"
          onClick={openCreateDialog}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Delete all challenges" aria-label="add">
        <Fab
          onClick={openDeleteDialog}
          className={fav}
          color="secondary"
          aria-label="remove"
        >
          <DeleteIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};
