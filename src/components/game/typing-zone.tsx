import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/game-context';

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
    borderRadius: '4px'
  },
  textTypingZone: {
    overflow: 'hidden',
    whiteSpace: 'pre',
    width: '50%',
    display: 'inline-block'
  },
  rightTypingZone: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'right'
  },
  rightTypingZoneFloat: {
    float: 'right'
  },
  leftTypingZone: {
    textAlign: 'left'
  },
  typingZoneRibbon: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
}));

export const TypingZone: React.FunctionComponent = () => {
  const {
    typingZone,
    textTypingZone,
    rightTypingZone,
    rightTypingZoneFloat,
    leftTypingZone,
    correctTypedText,
    incorrectTypedText,
    decoratedText,
    typingZoneRibbon
  } = playStyle();
  const { typedKey, textToType, launched, typeAKey, launchGame } = useContext(
    GameContext
  );
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
  }, [launched, handleKeyPress]);

  const launchGameByTyping = useCallback(
    event => {
      launchGame();
      typeAKey(event.key);
    },
    [launchGame, typeAKey]
  );

  // initial listener to launch a game
  useEffect(() => {
    if (!launched) {
      document.body.addEventListener('keypress', launchGameByTyping);
    }
    return () => {
      // remove when unmount or when new redefinition
      document.body.removeEventListener('keypress', launchGameByTyping);
    };
  }, [launched, launchGameByTyping]);

  return (
    <Box>
      <Button
        disabled={launched}
        onClick={() => launchGame()}
        className={typingZoneRibbon}
      >
        Type the first letter or click here to start the challenge
      </Button>
      <Box p={1} className={typingZone}>
        <Box className={`${rightTypingZone} ${textTypingZone}`}>
          <Typography variant="h5" className={rightTypingZoneFloat}>
            {typedText}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          className={`${leftTypingZone} ${textTypingZone}`}
        >
          {textToType}
        </Typography>
      </Box>
    </Box>
  );
};
