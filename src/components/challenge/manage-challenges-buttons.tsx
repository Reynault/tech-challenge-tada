import { Box, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useContext } from 'react';
import { DialogContext } from '../../contexts/dialog-context';
import { DeleteChallengeForm } from './delete-challenge-form';
import { UpdateChallengeForm } from './update-challenge-form';

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
      <Fab
        className={fav}
        color="primary"
        aria-label="add"
        onClick={openCreateModal}
      >
        <AddIcon />
      </Fab>
      <Fab
        onClick={openDeleteModal}
        className={fav}
        color="secondary"
        aria-label="remove"
      >
        <DeleteIcon />
      </Fab>
    </Box>
  );
};
