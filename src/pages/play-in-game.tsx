import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGame } from '../components/game/simple-game';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { GameProvider } from '../contexts/game-context';
import { TimerProvider } from '../contexts/timer-context';

export const PlayInGame: React.FunctionComponent = () => {
  const { getOne } = useContext(ChallengesContext);
  const { challengeId }: any = useParams();
  // fetching wanted challenge
  const challenge = getOne(challengeId);

  return (
    <TimerProvider>
      <GameProvider>
        <SimpleGame {...{ challenge }} />
      </GameProvider>
    </TimerProvider>
  );
};
