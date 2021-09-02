import { Box, Container, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext } from 'react';
import { CardList } from '../components/list/card-list';
import { ChallengeCard } from '../components/list/challenge-card';
import { EmptyList } from '../components/list/empty-list';
import { ChallengeContext } from '../contexts/challenge-context';
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

export const Play: React.FunctionComponent = () => {
  const { challenges } = useContext(ChallengeContext);
  const classesPlay = playStyle();
  const classes = globalStyles();

  return (
    <Container className={classes.pageBody}>
      <Box>
        <h1 className={classes.pageTitle}>Select a challenge !</h1>
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
        <Fab className={classesPlay.fav} color="secondary" aria-label="remove">
          <DeleteIcon />
        </Fab>
        <Fab className={classesPlay.fav} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
};
