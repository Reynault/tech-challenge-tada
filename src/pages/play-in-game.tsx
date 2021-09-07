import React, { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { SimpleGame } from '../components/game/simple-game';
import { GameProvider } from '../contexts/games/game-context';
import { Routes } from '../shared/constants/routes';

/**
 * In game page
 */
export const PlayInGame: React.FunctionComponent = () => {
  const { getOne } = useContext(ChallengesContext);
  // fetching challenge id to play from url
  const { challengeId }: any = useParams();
  // fetching wanted challenge
  const challenge = getOne(challengeId);
  if (!challenge) {
    return <Redirect to={Routes.PLAY_SELECTION} />;
  }
  return (
    // using game provider with challenge to type
    <GameProvider initialText={challenge.text}>
      {/* use a simple game */}
      <SimpleGame challenge={challenge} />
    </GameProvider>
  );
};
