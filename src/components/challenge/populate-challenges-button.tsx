import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { globalStyles } from '../../shared/styles/globalStyles';

/**
 * When the list of challenges is empty, indicates it
 * and display a button to populate it with default values
 */
export const PopulateChallengesButton: React.FunctionComponent = () => {
  const { dispatch } = useContext(ChallengesContext);
  const { centeredElement } = globalStyles();
  // callback to populate with default values
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
