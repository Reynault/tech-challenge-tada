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

/**
 * Component used to display and manage a typing zone
 */
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
  // using game context
  const {
    typedKey,
    textToType,
    launched,
    finished,
    typeAKey,
    launchGame
  } = useContext(GameContext);
  // decorated typed text (with <span></span> for correct and incorrect characters)
  const [typedText, setTypedText] = useState(<></>);
  /**
   * callback used to handle key press
   * event by typing the current key
   */
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      typeAKey(event.key);
    },
    [typeAKey]
  );
  /**
   * callback used to clear the typed text and to launch the game
   */
  const clearTextAndLaunchGame = useCallback(() => {
    setTypedText(<></>);
    launchGame();
  }, [setTypedText, launchGame]);
  /**
   * callback used to launch the game when typing a key at the beginning
   */
  const launchGameByTyping = useCallback(
    event => {
      clearTextAndLaunchGame();
      typeAKey(event.key);
    },
    [clearTextAndLaunchGame, typeAKey]
  );
  /**
   * use effect used to re-render the component
   * when launching a new game. (we want to empty the typed text
   * for the new game)
   */
  useEffect(() => {
    if (!launched && !finished) {
      setTypedText(<></>);
    }
  }, [launched, finished]);
  /**
   * use effect used to handle when the typed key is changed. You might wonder
   * why I didn't used a simple callback to do that. It is because of a behavior
   * explained in the Game context. It's mainly due to the fact that when a user
   * is typing really fast, the callback used to type a key might be called twice
   * which leads to an inconsistency in the game state. (a key typed twice for example)
   */
  useEffect(() => {
    if (!!typedKey) {
      // adding the new key to the typed text
      setTypedText(typedText => {
        return (
          <>
            {typedText}
            {/*
              In order to color the key, we use a span with a class
              depending if the key is valid or not.
            */}
            <span
              className={`${
                typedKey.isValid ? correctTypedText : incorrectTypedText
              } ${decoratedText}`}
            >
              {typedKey.key}
            </span>
          </>
        );
      });
    }
  }, [
    typedKey,
    setTypedText,
    correctTypedText,
    incorrectTypedText,
    decoratedText
  ]);
  /**
   * use effect used to add a callback to a listener on the key press event
   *
   * It is reassigned when the callback method is re-memoized
   */
  useEffect(() => {
    if (launched) {
      document.body.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      // remove when unmount or when new redefinition (last value)
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [launched, handleKeyPress]);
  /**
   * use effect used to add a callback to a listener on the key press event
   * when initializing a new game.
   *
   * It is reassigned when the callback method is re-memoized
   */
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
      {/* button used to start typing */}
      <Button
        disabled={launched}
        onClick={clearTextAndLaunchGame}
        className={typingZoneRibbon}
      >
        Type the first letter or click here to start the challenge
      </Button>
      {/*
        The typing zone is composed of two divs, one for the typed text and
        the other one for the text yet to be typed
      */}
      <Box p={1} className={typingZone}>
        {/*
          As you can see, the div on the left uses two divs to behave like that.
          One div is the box that aligns the text on the right and limit the size
          and the embedded one is floating so the overflow is done on the left.
        */}
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
