import { Box, Button, Container, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChallengesContext } from '../contexts/challenges/challenges-context';

export const PlayInGame: React.FunctionComponent = () => {
  const { getOne, state } = useContext(ChallengesContext);
  const { challengeId }: any = useParams();
  const challenge = getOne(state, challengeId);
  return (
    <Container>
      <Box>
        <Typography variant="h5" component="h2">
          {challenge.name}
        </Typography>
      </Box>
      <Box></Box>
      <Box>
        <Button>Cancel game</Button>
        <Typography>Timer</Typography>
        <Typography>Errors</Typography>
      </Box>
    </Container>
  );
};
