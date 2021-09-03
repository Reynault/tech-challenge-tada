import { Box, Button, Container, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useContext } from 'react';
import { DeleteChallengeForm } from '../components/dialog/delete-challenge-form';
import { UpdateChallengeForm } from '../components/dialog/update-challenge-form';
import { CardList } from '../components/list/card-list';
import { ChallengeCard } from '../components/list/challenge-card';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../contexts/challenges/challenges-reducer';
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
  const { dispatch } = useContext(ChallengesContext);
  const { state, isChallengesEmpty } = useContext(ChallengesContext);
  const { showModal } = useContext(DialogContext);
  const classesPlay = playStyle();
  const classes = globalStyles();
  const populate = useCallback(() => {
    dispatch({ type: ChallengeActionType.POPULATE });
  }, [dispatch]);
  const openCreateModal = useCallback(() => {
    showModal(<UpdateChallengeForm />);
  }, [showModal]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm />);
  }, [showModal]);

  return (
    <Container className={classes.pageBody}>
      <Box>
        <h1 className={classes.centeredElement}>Select a challenge !</h1>
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
          <Box className={classes.centeredElement}>
            <p>You don't have any challenges.</p>
            <Button color="primary" variant="contained" onClick={populate}>
              Populate with default values
            </Button>
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
