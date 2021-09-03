import { Box, Container, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useContext } from 'react';
import { DeleteChallengeForm } from '../components/form/delete-challenge-form';
import { InsertChallengeForm } from '../components/form/insert-challenge-form';
import { CardList } from '../components/list/card-list';
import { ChallengeCard } from '../components/list/challenge-card';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { DialogContext } from '../contexts/dialog-context';
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
  const { state, isChallengesEmpty } = useContext(ChallengesContext);
  const { showModal } = useContext(DialogContext);
  const classesPlay = playStyle();
  const classes = globalStyles();
  const openCreateModal = useCallback(() => {
    showModal(<InsertChallengeForm />);
  }, [showModal]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm />);
  }, [showModal]);

  return (
    <Container className={classes.pageBody}>
      <Box>
        <h1 className={classes.centeredTitle}>Select a challenge !</h1>
      </Box>
      <Box>
        {!isChallengesEmpty(state) ? (
          <CardList
            {...{
              dataToDisplay: state,
              howToDisplay: ChallengeCard
            }}
          />
        ) : (
          <Box>
            <p className={classes.centeredTitle}>
              You don't have any challenges.
            </p>
          </Box>
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
    </Container>
  );
};
