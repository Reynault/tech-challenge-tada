import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { SimpleGame } from '../components/game/simple-game';
import { GameProvider } from '../contexts/game-context';

export const PlayInGame: React.FunctionComponent = () => {
  const { getOne } = useContext(ChallengesContext);
  const { challengeId }: any = useParams();
  // fetching wanted challenge
  const challenge = getOne(challengeId);

  return (
    <GameProvider initialText={challenge.text}>
      <SimpleGame challenge={challenge} />
    </GameProvider>
  );
};
