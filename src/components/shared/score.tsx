import { Typography } from '@material-ui/core';
import React from 'react';
import { ScoreDto } from '../../shared/dto/challenge-dto';
import { TimeDisplay } from './time-display';

/**
 * Component that displays the score of a challenge
 * @param score to display
 */
export const Score: React.FunctionComponent<ScoreDto> = (score: ScoreDto) => {
  return (
    <>
      {!!score && score?.time ? (
        <Typography variant={'body1'} color="primary">
          <TimeDisplay time={score.time} />, {score.error} errors
        </Typography>
      ) : (
        <Typography variant={'body1'} color="secondary">
          Not tried yet !
        </Typography>
      )}
    </>
  );
};
