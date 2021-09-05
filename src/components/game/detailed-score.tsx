import { Box, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { GameContext } from '../../contexts/game-context';
import { ScoreDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { TimeDisplay } from '../shared/time-display';

export interface DetailedScoreProps {
  score: ScoreDto;
  bestScore: ScoreDto;
  hasWon: boolean;
}

export const DetailedScore: React.FunctionComponent<DetailedScoreProps> = ({
  score,
  bestScore,
  hasWon
}) => {
  const { centeredElement } = globalStyles();
  const { launched, finished } = useContext(GameContext);
  return (
    <Box className={centeredElement} p={2}>
      <Box>
        <Typography variant="h4">Score</Typography>
        <Typography variant="body1">
          Time: <TimeDisplay time={score?.time} />
        </Typography>
        <Typography variant="body1">
          Errors: {!!score?.error ? score.error : '--'}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h4">Best score</Typography>
        <Typography variant="body1" color={hasWon ? 'primary' : 'initial'}>
          Time: <TimeDisplay time={bestScore?.time} />
        </Typography>
        <Typography variant="body1" color={hasWon ? 'primary' : 'initial'}>
          Errors: {!!bestScore?.error ? bestScore.error : '--'}
        </Typography>
      </Box>
    </Box>
  );
};
