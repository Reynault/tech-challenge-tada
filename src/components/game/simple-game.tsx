import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeDto, ScoreDto } from '../../shared/dto/challenge-dto';
import { PageTitle } from '../shared/page-title';
import { StateButtons } from './state-buttons';
import { TypingZone } from './typing-zone';
import { GameContext } from '../../contexts/game-context';
import { Timer } from '../shared/timer';
import { TimeDisplay } from '../shared/time-display';
import { globalStyles } from '../../shared/styles/globalStyles';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';

export interface SimpleGameProps {
  challenge: ChallengeDto;
}

export const SimpleGame: React.FunctionComponent<SimpleGameProps> = ({
  challenge
}) => {
  const { centeredElement } = globalStyles();
  const { error, finished, launched, startingTime } = useContext(GameContext);
  const [hasWon, setHasWon] = useState(false);
  const [newChallenge, setNewChallenge] = useState(challenge);
  const { dispatch } = useContext(ChallengesContext);

  const isBestScore = useCallback(
    (best: ScoreDto, score: ScoreDto): boolean => {
      return !best || (best.error >= score.error && best.time >= score.time);
    },
    []
  );

  useEffect(() => {
    if (finished) {
      const time = Date.now() - startingTime;
      if (isBestScore(newChallenge?.bestScore, { time, error })) {
        setNewChallenge(previousChallenge => {
          return Object.assign(previousChallenge, {
            bestScore: { time, error }
          });
        });
        dispatch({
          type: ChallengeActionType.PUT,
          payload: newChallenge,
          old: newChallenge
        });
        setHasWon(true);
      } else {
        setHasWon(false);
      }
    }
  }, [
    newChallenge,
    launched,
    startingTime,
    isBestScore,
    error,
    finished,
    setHasWon,
    dispatch
  ]);

  return (
    <Container>
      <PageTitle {...{ label: 'Type the text !' }} />
      <TypingZone />
      <Box className={centeredElement} p={2}>
        <Box>
          <Typography variant="h4">Score</Typography>
          <Typography variant="body1">
            Time: <Timer start={launched} startingTime={startingTime} />
          </Typography>
          <Typography variant="body1">Errors: {error}</Typography>
        </Box>
        <Box>
          <Typography variant="h4">Best score</Typography>
          <Typography variant="body1" color={hasWon ? 'primary' : 'initial'}>
            Time: <TimeDisplay time={newChallenge?.bestScore?.time} />
          </Typography>
          <Typography variant="body1" color={hasWon ? 'primary' : 'initial'}>
            Errors:{' '}
            {!!newChallenge?.bestScore ? newChallenge.bestScore.error : '--'}
          </Typography>
        </Box>
      </Box>
      <StateButtons />
    </Container>
  );
};
