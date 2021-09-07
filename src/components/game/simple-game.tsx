import { Box, Container, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeDto, ScoreDto } from '../../shared/dto/challenge-dto';
import { PageTitle } from '../shared/page-title';
import { StateButtons } from './state-buttons';
import { TypingZone } from './typing-zone';
import { GameContext } from '../../contexts/games/game-context';
import { Timer } from '../shared/timer';
import { TimeDisplay } from '../shared/time-display';
import { globalStyles } from '../../shared/styles/globalStyles';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';

export interface SimpleGameProps {
  challenge: ChallengeDto;
}

/**
 * Define a simple game interface
 * @param challenge to type
 */
export const SimpleGame: React.FunctionComponent<SimpleGameProps> = ({
  challenge
}) => {
  const { centeredElement } = globalStyles();
  const { state } = useContext(GameContext);
  // when finished, define if has won or not
  const [hasWon, setHasWon] = useState(false);
  // new challenge with new score
  const [newChallenge, setNewChallenge] = useState(challenge);
  // use dispatch to update the challenge
  const { dispatch } = useContext(ChallengesContext);
  // method used to test if the given score is better that the actual one
  const isBestScore = useCallback(
    (best: ScoreDto, score: ScoreDto): boolean => {
      return !best || (best.error >= score.error && best.time >= score.time);
    },
    []
  );
  /**
   * Use effect is used here to re-render the current component
   * when the game is finished, so the component will then compute the
   * score and check if it is better than the best one and replace it
   */
  useEffect(() => {
    if (state.finished) {
      const time = Date.now() - state.startingTime;
      if (isBestScore(newChallenge?.bestScore, { time, error: state.error })) {
        setNewChallenge(previousChallenge => {
          return Object.assign(previousChallenge, {
            bestScore: { time, error: state.error }
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
  }, [newChallenge, isBestScore, setHasWon, dispatch, state]);

  return (
    <Container>
      <PageTitle {...{ label: 'Type the text !' }} />
      <TypingZone />
      {/* scores */}
      <Box className={centeredElement} p={2}>
        {/* current score */}
        <Box>
          <Typography variant="h4">Score</Typography>
          <Typography variant="body1">
            {/*
              timer exported into a component, to avoir re-rendering when
              time is changing (every milliseconds)
            */}
            Time:{' '}
            <Timer start={state.launched} startingTime={state.startingTime} />
          </Typography>
          <Typography variant="body1">Errors: {state.error}</Typography>
        </Box>
        {/* best score */}
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
