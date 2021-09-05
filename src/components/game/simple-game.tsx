import { Container } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { GameContext } from '../../contexts/game-context';
import { TimerContext } from '../../contexts/timer-context';
import { ChallengeDto, ScoreDto } from '../../shared/dto/challenge-dto';
import { PageTitle } from '../shared/page-title';
import { DetailedScore } from './detailed-score';
import { GameConfigurator } from './game-configurator';
import { StateButtons } from './state-buttons';
import { TypingZone } from './typing-zone';

const isBestScore = (best: ScoreDto, score: ScoreDto): boolean => {
  return !best || (best.error >= score.error && best.time >= score.time);
};

export interface SimpleGameProps {
  challenge: ChallengeDto;
}

export const SimpleGame: React.FunctionComponent<SimpleGameProps> = ({
  challenge
}) => {
  const { dispatch } = useContext(ChallengesContext);
  const { time } = useContext(TimerContext);
  const { error, finished } = useContext(GameContext);
  const [hasWon, setHasWon] = useState(false);

  // determine what to do when a game is finished
  useEffect(() => {
    if (finished) {
      const score = {
        time,
        error
      };
      if (isBestScore(challenge?.bestScore, score)) {
        const newChallenge = Object.assign({}, challenge);
        newChallenge.bestScore = {
          time,
          error
        };

        dispatch({
          type: ChallengeActionType.PUT,
          payload: newChallenge,
          old: challenge
        });

        setHasWon(true);
      } else {
        setHasWon(false);
      }
    }
  }, [finished, setHasWon]);

  return (
    <Container>
      <GameConfigurator text={challenge.text} />
      <PageTitle {...{ label: 'Type the text !' }} />
      <TypingZone />
      <StateButtons />
      <DetailedScore
        bestScore={challenge.bestScore}
        score={{ time, error }}
        hasWon={hasWon}
      />
    </Container>
  );
};
