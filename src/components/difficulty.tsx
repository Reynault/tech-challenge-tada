import { Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import StarIcon from '@material-ui/icons/Star';

export interface DifficultyProps {
  difficulty?: number;
}

export const Difficulty: React.FunctionComponent<DifficultyProps> = ({
  difficulty
}) => {
  const displayDifficulty = useCallback(() => {
    const stars = [];
    let i;
    for (i = 0; i < 5 && i < difficulty; i++) {
      stars.push(<StarIcon color="secondary" key={i} />);
    }
    for (let j = i; j < 5; j++) {
      stars.push(<StarIcon key={j} />);
    }
    return stars;
  }, [difficulty]);
  return <Box>{displayDifficulty()}</Box>;
};
