import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/game-context';
import { globalStyles } from '../../shared/styles/globalStyles';

const playStyle = makeStyles(theme => ({
  correctTypedText: {
    color: '#4caf50'
  },
  incorrectTypedText: {
    color: '#f44336'
  },
  typingZone: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    padding: '1%'
  },
  blurred: {
    animationDirection: 'reverse',
    animation: 'blur 0.5s',
    filter: 'blur(4px)'
  },
  notBlurred: {
    animation: 'blur 0.5s'
  }
}));

export const TypingZone: React.FunctionComponent = () => {
  const { typingZone, blurred, notBlurred } = playStyle();
  const { centeredElement } = globalStyles();
  const { typedText, textToType, launched, typeAKey } = useContext(GameContext);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      typeAKey(event.key);
    },
    [typeAKey]
  );

  // when listener is redefined, adding that listener
  // to key press event
  useEffect(() => {
    if (launched) {
      document.body.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      // remove when unmount or when new redefinition
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress, launched]);

  return (
    <Box
      className={`${typingZone} ${
        launched ? notBlurred : blurred
      } ${centeredElement}`}
    >
      <Typography variant="h5">
        {typedText}
        {textToType}
      </Typography>
    </Box>
  );
};
