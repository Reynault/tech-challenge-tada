import { Box, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../../contexts/game-context';
import { Routes } from '../../shared/constants/routes';
import { globalStyles } from '../../shared/styles/globalStyles';

export const StateButtons: React.FunctionComponent = () => {
  const { centeredElement } = globalStyles();
  const { resetGame, launchGame, launched } = useContext(GameContext);
  return (
    <Box className={centeredElement}>
      <Button
        disabled={launched}
        onClick={() => launchGame()}
        color={'primary'}
        variant={'outlined'}
      >
        Start
      </Button>
      <Button
        disabled={!launched}
        onClick={() => resetGame()}
        color={'primary'}
        variant={'outlined'}
      >
        Reset
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
