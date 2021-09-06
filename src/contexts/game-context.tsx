import React, { useCallback, useEffect, useState } from 'react';

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
  finished: boolean;
  error: number;
  startingTime: number;
}

export const GameContext: React.Context<GameContextProps> = React.createContext(
  {
    launchGame: null,
    resetGame: null,
    launched: null,
    typedKey: null,
    textToType: null,
    typeAKey: null,
    finished: null,
    error: null,
    startingTime: null
  }
);

export interface GameProviderProps {
  children: JSX.Element;
  initialText: string;
}

export const GameProvider: React.FunctionComponent<GameProviderProps> = ({
  children,
  initialText
}) => {
  // given properties
  const [typedKey, setTypedKey] = useState(null);
  const [textToType, setTextToType] = useState(initialText);
  const [error, setError] = useState(0);
  const [finished, setFinished] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [startingTime, setStartingTime] = useState(0);

  // typed key queue use to store pending keys
  const [keyQueue, setKeyQueue] = useState([]);
  // boolean used to check whether a key is already being treated or not
  const [alreadyTyping, setAlreadyTyping] = useState(false);

  const resetGame = useCallback(() => {
    setLaunched(false);
    setError(0);
    setTypedKey(null);
    setTextToType(initialText);
  }, [setLaunched, setError, setTypedKey, setTextToType, initialText]);

  const launchGame = useCallback(() => {
    resetGame();
    setFinished(false);
    setLaunched(true);
    setStartingTime(Date.now());
  }, [resetGame]);

  // validate a key given by the user
  const validateAKey = useCallback(
    (typedKey: string) => {
      setAlreadyTyping(true);
      const keyToType = textToType[0];
      if (typedKey === keyToType) {
        setTypedKey({ key: keyToType, isValid: true });
      } else {
        setTypedKey({ key: keyToType, isValid: false });
        setError(error => error + 1);
      }
      const remainingCharacters: string = textToType.substring(1);
      setTextToType(remainingCharacters);
      if (!remainingCharacters) {
        setLaunched(false);
        setFinished(true);
      }
      setAlreadyTyping(false);
    },
    [
      setError,
      setTypedKey,
      textToType,
      setTextToType,
      setAlreadyTyping,
      setFinished
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
    // we consume one key from the queue that is storing pending inputs given by
    // the user. it is to make sure that we handle every input from the user.
    if (launched && !alreadyTyping && keyQueue.length > 0) {
      const nextEventToConsume = keyQueue.shift();
      setKeyQueue(keyQueue.splice(1));
      validateAKey(nextEventToConsume);
    }
  }, [alreadyTyping, typeAKey, keyQueue, launched, validateAKey]);

  return (
    <GameContext.Provider
      value={{
        launchGame,
        resetGame,
        launched,
        typedKey,
        textToType,
        typeAKey,
        finished,
        error,
        startingTime
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
