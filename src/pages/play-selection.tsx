import { Box, Container, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useContext, useState } from 'react';
import { DeleteChallengeForm } from '../components/form/delete-challenge-form';
import { InsertChallengeForm } from '../components/form/insert-challenge-form';
import { CardList } from '../components/list/card-list';
import { ChallengeCard } from '../components/list/challenge-card';
import { EmptyList } from '../components/list/empty-list';
import { ChallengeContext } from '../contexts/challenge/challenge-context';
import { globalStyles } from '../shared/styles/globalStyles';

const playStyle = makeStyles({
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

export const PlaySelection: React.FunctionComponent = () => {
  const { challenges } = useContext(ChallengeContext);
  const classesPlay = playStyle();
  const classes = globalStyles();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const openCreateModal = useCallback(() => {
    setOpenCreate(true);
  }, [setOpenCreate]);
  const openDeleteModal = useCallback(() => {
    setOpenDelete(true);
  }, [setOpenDelete]);

  return (
    <Container className={classes.pageBody}>
      <Box>
        <h1 className={classes.centeredTitle}>Select a challenge !</h1>
      </Box>
      <Box>
        {!!challenges ? (
          <CardList
            {...{
              dataToDisplay: challenges,
              howToDisplay: ChallengeCard
            }}
          />
        ) : (
          <EmptyList label={"You don't have any challenge."} />
        )}
      </Box>
      <Box className={classesPlay.favGroup}>
        <Fab
          className={classesPlay.fav}
          color="primary"
          aria-label="add"
          onClick={openCreateModal}
        >
          <AddIcon />
        </Fab>
        <Fab
          onClick={openDeleteModal}
          className={classesPlay.fav}
          color="secondary"
          aria-label="remove"
        >
          <DeleteIcon />
        </Fab>
      </Box>
      <InsertChallengeForm {...{ open: openCreate, setOpen: setOpenCreate }} />
      <DeleteChallengeForm {...{ open: openDelete, setOpen: setOpenDelete }} />
    </Container>
  );
};
