import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TimerContext } from './timer-context';

export interface TypedKey {
  key: string;
  isValid: boolean;
}

export interface GameContextProps {
  launchGame: () => void;
  resetGame: () => void;
  launched: boolean;
  typeAKey: (key: string) => void;
  typedKey: TypedKey;
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
    typedKey: null,
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

export const GameProvider: React.FunctionComponent<GameProviderProps> = ({
  children
}) => {
  const { start, reset, stop } = useContext(TimerContext);

  const [initialText, setInitialText] = useState('');
  const [typedKey, setTypedKey] = useState(null);
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
    setTypedKey(null);
    setTextToType(initialText);
  }, [setLaunched, reset, setError, setTypedKey, setTextToType, initialText]);

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
        setTypedKey({ key: keyToType, isValid: true });
      } else {
        setTypedKey({ key: keyToType, isValid: false });
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
      setTypedKey,
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
        typedKey,
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
