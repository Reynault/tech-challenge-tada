import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/game-context';
import { TimerContext } from '../../contexts/timer-context';

export interface GameConfiguratorProps {
  text: string;
}

export const GameConfigurator: React.FunctionComponent<GameConfiguratorProps> = ({
  text
}) => {
  const { setChallengeText } = useContext(GameContext);
  const { setDelay } = useContext(TimerContext);
  useEffect(() => {
    setChallengeText(text);
    setDelay(1);
  }, []);
  return <></>;
};
