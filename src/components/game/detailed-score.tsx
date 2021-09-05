import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../contexts/game-context';
import { ScoreDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { TimeDisplay } from '../shared/time-display';

export interface DetailedScoreProps {
  score: ScoreDto;
  hasWon: boolean;
}

export const DetailedScore: React.FunctionComponent<DetailedScoreProps> = ({
  score,
  hasWon
}) => {
  const { centeredElement } = globalStyles();
  const { finished } = useContext(GameContext);
  return finished || !!score ? (
    <Box className={centeredElement}>
      <Typography variant="h2">Score</Typography>
      <Typography variant="h4">
        Time: <TimeDisplay time={score?.time} />
      </Typography>
      <Typography variant="h4">Errors: {score?.error}</Typography>
      <Typography variant="h1" style={{ display: finished ? 'block' : 'none' }}>
        {hasWon ? 'Good Job !' : 'Too bad !'}
      </Typography>
    </Box>
  ) : (
    <></>
  );
};
