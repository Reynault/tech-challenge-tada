import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
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
    padding: '1%',
    overflow: 'auto',
    maxHeight: '80px',
    '&:hover': {
      filter: 'blur(0px)'
    }
  },
  typingZoneRibbon: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  blurred: {
    animation: 'blur 0.5s',
    filter: 'blur(4px)'
  }
}));

export const TypingZone: React.FunctionComponent = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const typingZoneElement = useRef(null);
  const {
    typingZone,
    blurred,
    correctTypedText,
    incorrectTypedText,
    decoratedText,
    typingZoneRibbon
  } = playStyle();
  const { centeredElement } = globalStyles();
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

  // initial listener to launch a game
  useEffect(() => {
    if (!launched) {
      document.body.addEventListener('keypress', launchGame);
    }
    return () => {
      // remove when unmount or when new redefinition
      document.body.removeEventListener('keypress', launchGame);
    };
  }, [launched, launchGame]);

  return (
    <Box>
      <Button
        disabled={launched}
        onClick={() => launchGame()}
        className={typingZoneRibbon}
      >
        Type a letter or click here to start the challenge
      </Button>
      <Typography
        variant="h5"
        ref={typingZoneElement}
        className={`${typingZone} ${
          launched ? '' : blurred
        } ${centeredElement}`}
      >
        {typedText}
        {textToType}
      </Typography>
    </Box>
  );
};
