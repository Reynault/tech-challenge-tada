import { makeStyles } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TimerContext } from './timer-context';

export interface GameContextProps {
  launchGame: () => void;
  resetGame: () => void;
  launched: boolean;
  typeAKey: (key: string) => void;
  typedText: JSX.Element;
  textToType: string;
  setChallengeText: (text: string) => void;
  error: number;
  finished: boolean;
}

export const GameContext: React.Context<GameContextProps> = React.createContext(
  {
    launchGame: null,
    resetGame: null,
    launched: null,
    typedText: null,
    textToType: null,
    typeAKey: null,
    setChallengeText: null,
    error: null,
    finished: null
  }
);

export interface GameProviderProps {
  children: JSX.Element;
}

const playStyle = makeStyles({
  correctTypedText: {
    color: '#4caf50'
  },
  incorrectTypedText: {
    color: '#f44336'
  }
});

export const GameProvider: React.FunctionComponent<GameProviderProps> = ({
  children
}) => {
  const { correctTypedText, incorrectTypedText } = playStyle();
  const { start, reset, stop } = useContext(TimerContext);

  const [initialText, setInitialText] = useState('');
  const [typedText, setTypedText] = useState(<></>);
  const [textToType, setTextToType] = useState('');

  const [launched, setLaunched] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(0);

  const [keyQueue, setKeyQueue] = useState([]);

  const [alreadyTyping, setAlreadyTyping] = useState(false);

  const setChallengeText = useCallback(
    (text: string) => {
      setInitialText(text);
      setTextToType(text);
    },
    [setInitialText, setTextToType]
  );

  const resetGame = useCallback(() => {
    setLaunched(false);
    reset();
    setError(0);
    setTypedText(<></>);
    setTextToType(initialText);
  }, [setLaunched, reset, setError, setTypedText, setTextToType, initialText]);

  const launchGame = useCallback(() => {
    resetGame();
    setFinished(false);
    setLaunched(true);
    start();
  }, [launched, resetGame]);

  // validate a key given by the user
  const validateAKey = useCallback(
    (typedKey: string) => {
      setAlreadyTyping(true);
      const keyToType = textToType[0];
      if (typedKey === keyToType) {
        setTypedText(
          <>
            {typedText}
            <span className={correctTypedText}>{keyToType}</span>
          </>
        );
      } else {
        setTypedText(
          <>
            {typedText}
            <span className={incorrectTypedText}>{keyToType}</span>
          </>
        );
        setError(error + 1);
      }
      const remainingCharacters: string = textToType.substring(1);
      setTextToType(remainingCharacters);
      if (!remainingCharacters) {
        setLaunched(false);
        setFinished(true);
        stop();
      }
      setAlreadyTyping(false);
    },
    [
      setError,
      error,
      typedText,
      setTypedText,
      textToType,
      setTextToType,
      alreadyTyping,
      setAlreadyTyping,
      setFinished,
      stop
    ]
  );

  // store user keys in a queue ready to be consumed
  const typeAKey = useCallback(
    (key: string) => {
      setKeyQueue(keyQueue.concat([key]));
    },
    [setKeyQueue, keyQueue]
  );

  useEffect(() => {
    // after each key given by the user or when the component is ready
    // we consume one key from the queue that stored pending inputs given by
    // the user
    // it is to make sure that we handle every input from the user
    if (launched && !alreadyTyping && keyQueue.length > 0) {
      const nextEventToConsume = keyQueue.shift();
      setKeyQueue(keyQueue.splice(1));
      validateAKey(nextEventToConsume);
    }
  }, [alreadyTyping, typeAKey]);

  return (
    <GameContext.Provider
      value={{
        launchGame,
        resetGame,
        launched,
        typedText,
        textToType,
        typeAKey,
        error,
        finished,
        setChallengeText
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
