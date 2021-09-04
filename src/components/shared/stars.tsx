import { Box } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import React, { useCallback } from 'react';

export interface DifficultyProps {
  value?: number;
  maximalNumberOfStars?: number;
}

export const Stars: React.FunctionComponent<DifficultyProps> = ({
  value = 0,
  maximalNumberOfStars = 5
}) => {
  const displayStars = useCallback(() => {
    const stars = [];
    let i;
    for (i = 0; i < maximalNumberOfStars && i < value; i++) {
      stars.push(<StarIcon color="secondary" key={i} />);
    }
    for (let j = i; j < maximalNumberOfStars; j++) {
      stars.push(<StarIcon key={j} />);
    }
    return stars;
  }, [value]);
  return <Box>{displayStars()}</Box>;
};
