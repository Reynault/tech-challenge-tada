import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { TimerContext } from '../../contexts/timer-context';
import { globalStyles } from '../../shared/styles/globalStyles';
import { TimeDisplay } from '../shared/time-display';

export const TimerDisplay: React.FunctionComponent = () => {
  const { centeredElement } = globalStyles();
  const { time } = useContext(TimerContext);

  return (
    <Box className={centeredElement}>
      <Typography variant="h2">
        <TimeDisplay time={time} />
      </Typography>
    </Box>
  );
};
