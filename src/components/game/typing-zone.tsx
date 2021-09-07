import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../contexts/games/game-context';

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
  const { state, typeAKey, launchGame } = useContext(GameContext);
  // decorated typed text (with <span></span> for correct and incorrect characters)
  const [typedText, setTypedText] = useState(<></>);
  // typed key queue use to store pending keys
  const [keyQueue, setKeyQueue] = useState([]);
  // boolean used to check whether a key is already being treated or not
  const [alreadyTyping, setAlreadyTyping] = useState(false);
  /**
   * use effect used to consume the typed keys queue. It's mainly due to the fact that when a user
   * is typing really fast, the callback used to type a key might be called twice
   * which leads to an inconsistency in the game state. (a key typed twice for example)
   *
   * So in order to avoid that, we generate a queue that'll contain every key typed by
   * the user and consume each one at one point. (in the exact order)
   */
  useEffect(() => {
    // after each key given by the user or when the component is ready
    // we consume one key from the queue that is storing pending inputs given by
    // the user. it is to make sure that we handle every input from the user.
    if (!alreadyTyping && keyQueue.length > 0) {
      const nextEventToConsume = keyQueue.shift();
      setKeyQueue(keyQueue.splice(1));
      // indicates to the context that a key is already being processed
      setAlreadyTyping(true);
      typeAKey(nextEventToConsume);
      setAlreadyTyping(false);
    }
  }, [alreadyTyping, typeAKey, keyQueue]);
  /**
   * callback used to handle key press
   * event by typing the current key.
   * It stores a key typed by the user in a queue.
   */
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      setKeyQueue(keyQueue.concat([event.key]));
    },
    [setKeyQueue, keyQueue]
  );
  /**
   * callback used to clear the typed text and to launch the game
   */
  const clearTextAndLaunchGame = useCallback(
    (key?: string) => {
      setTypedText(<></>);
      launchGame(key);
    },
    [setTypedText, launchGame]
  );
  /**
   * callback used to launch the game when typing a key at the beginning
   */
  const launchGameByTyping = useCallback(
    event => {
      clearTextAndLaunchGame(event.key);
    },
    [clearTextAndLaunchGame]
  );
  /**
   * use effect used to re-render the component
   * when launching a new game. (we want to empty the typed text
   * for the new game)
   */
  useEffect(() => {
    if (!state.launched && !state.finished) {
      setTypedText(<></>);
    }
  }, [state.launched, state.finished]);
  /**
   * use effect used to handle when the typed key is changed. You might wonder
   * why I didn't used a simple callback to do that. It's mainly due to the fact that when a user
   * is typing really fast, the callback used to type a key might be called twice
   * which leads to an inconsistency in the game state. (a key typed twice for example)
   */
  useEffect(() => {
    if (!!state.typedKey) {
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
                state.typedKey.isValid ? correctTypedText : incorrectTypedText
              } ${decoratedText}`}
            >
              {state.typedKey.key}
            </span>
          </>
        );
      });
    }
  }, [
    state.typedKey,
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
    if (state.launched) {
      document.body.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      // remove when unmount or when new redefinition (last value)
      document.body.removeEventListener('keypress', handleKeyPress);
    };
  }, [state.launched, handleKeyPress]);
  /**
   * use effect used to add a callback to a listener on the key press event
   * when initializing a new game.
   *
   * It is reassigned when the callback method is re-memoized
   */
  useEffect(() => {
    if (!state.launched) {
      document.body.addEventListener('keypress', launchGameByTyping);
    }
    return () => {
      // remove when unmount or when new redefinition
      document.body.removeEventListener('keypress', launchGameByTyping);
    };
  }, [state.launched, launchGameByTyping]);
  return (
    <Box>
      {/* button used to start typing */}
      <Button
        disabled={state.launched}
        onClick={() => clearTextAndLaunchGame()}
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
          {state.textToType}
        </Typography>
      </Box>
    </Box>
  );
};
