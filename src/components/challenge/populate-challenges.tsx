import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { globalStyles } from '../../shared/styles/globalStyles';

export const PopulateChallenges: React.FunctionComponent = () => {
  const { dispatch } = useContext(ChallengesContext);
  const { centeredElement } = globalStyles();
  const populate = useCallback(() => {
    dispatch({ type: ChallengeActionType.POPULATE });
  }, [dispatch]);
  return (
    <Box className={centeredElement}>
      <Box p={3}>
        <Typography variant={`h6`}>You don't have any challenges.</Typography>
      </Box>
      <Button color="primary" variant="contained" onClick={populate}>
        Populate with default values
      </Button>
    </Box>
  );
};
