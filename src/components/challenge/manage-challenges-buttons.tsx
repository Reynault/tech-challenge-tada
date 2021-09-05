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

export const ManageChallengesButtons: React.FunctionComponent = () => {
  const { fav, favGroup } = buttonsStyle();
  const { showModal } = useContext(DialogContext);

  const openCreateModal = useCallback(() => {
    showModal(<UpdateChallengeForm />);
  }, [showModal]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm />);
  }, [showModal]);
  return (
    <Box className={favGroup}>
      <Tooltip title="Add a challenge" aria-label="add">
        <Fab
          className={fav}
          color="primary"
          aria-label="add"
          onClick={openCreateModal}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Delete all challenges" aria-label="add">
        <Fab
          onClick={openDeleteModal}
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
