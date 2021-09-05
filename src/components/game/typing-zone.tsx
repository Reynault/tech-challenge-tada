import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/game-context';
import { globalStyles } from '../../shared/styles/globalStyles';

const playStyle = makeStyles(theme => ({
  correctTypedText: {
    color: '#4caf50'
  },
  incorrectTypedText: {
    color: '#f44336'
  },
  decoratedText: {
    textDecoration: 'underline'
  },
  typingZone: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    padding: '1%'
  },
  blurred: {
    animationDirection: 'reverse',
    animation: 'blur 1s',
    filter: 'blur(4px)'
  },
  notBlurred: {
    animation: 'blur 1s'
  }
}));

export const TypingZone: React.FunctionComponent = () => {
  const {} = playStyle();

  const {
    typingZone,
    blurred,
    notBlurred,
    correctTypedText,
    incorrectTypedText,
    decoratedText
  } = playStyle();
  const { centeredElement } = globalStyles();
  const { typedKey, textToType, launched, typeAKey } = useContext(GameContext);
  const [typedText, setTypedText] = useState(<></>);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      typeAKey(event.key);
    },
    [typeAKey]
  );

  useEffect(() => {
    setTypedText(<></>);
  }, [textToType]);

  useEffect(() => {
    if (!!typedKey) {
      setTypedText(
        <>
          {typedText}
          <span
            className={`${
              typedKey.isValid ? correctTypedText : incorrectTypedText
            } ${decoratedText}`}
          >
            {typedKey.key}
          </span>
        </>
      );
    }
  }, [typedKey]);

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
