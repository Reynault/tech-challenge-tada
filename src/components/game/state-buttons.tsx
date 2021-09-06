import { Box, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../../contexts/game-context';
import { Routes } from '../../shared/constants/routes';
import { globalStyles } from '../../shared/styles/globalStyles';

export const StateButtons: React.FunctionComponent = () => {
  const { flexButtons } = globalStyles();
  const { resetGame, launched } = useContext(GameContext);
  return (
    <Box p={2} className={flexButtons}>
      <Button
        disabled={!launched}
        onClick={resetGame}
        color={'primary'}
        variant={'outlined'}
      >
        Reset the game
      </Button>
      <Button
        component={Link}
        to={Routes.PLAY_SELECTION}
        color={'secondary'}
        variant={'outlined'}
      >
        Select another challenge
      </Button>
    </Box>
  );
};
