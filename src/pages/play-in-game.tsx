import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { SimpleGame } from '../components/game/simple-game';
import { GameProvider } from '../contexts/game-context';

/**
 * In game page
 */
export const PlayInGame: React.FunctionComponent = () => {
  const { getOne } = useContext(ChallengesContext);
  // fetching challenge id to play from url
  const { challengeId }: any = useParams();
  // fetching wanted challenge
  const challenge = getOne(challengeId);
  return (
    // using game provider with challenge to type
    <GameProvider initialText={challenge.text}>
      {/* use a simple game */}
      <SimpleGame challenge={challenge} />
    </GameProvider>
  );
};
