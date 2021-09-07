import React, { useCallback, useEffect, useState } from 'react';

export interface TypedKey {
  key: string;
  isValid: boolean;
}

export interface GameContextProps {
  launchGame: () => void; // method to launch a game
  resetGame: () => void; // method to reset a game
  launched: boolean; // if the game is launched
  typeAKey: (key: string) => void; // when the user wants to type a key
  typedKey: TypedKey; // last key typed and if it is valid or not
  textToType: string; // remaining text to type
  finished: boolean; // if the game is finished
  error: number; // the number of errors made by the user
  startingTime: number; // when the game started, use to compute the time
}

/**
 * Defining game context which define a game state
 */
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

/**
 * Define a game component which define a simple game
 *
 * @param children to display
 * @param initialText to type
 */
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
  /**
   * Callback used to reset the game
   */
  const resetGame = useCallback(() => {
    setLaunched(false);
    setError(0);
    setTypedKey(null);
    setTextToType(initialText);
  }, [setLaunched, setError, setTypedKey, setTextToType, initialText]);
  /**
   * Callback used to launch the game
   */
  const launchGame = useCallback(() => {
    resetGame();
    setFinished(false);
    setLaunched(true);
    setStartingTime(Date.now());
  }, [resetGame]);
  /**
   * Callback used to validate a key given by the user
   */
  const validateAKey = useCallback(
    (typedKey: string) => {
      // indicates to the context that a key is already being processed
      setAlreadyTyping(true);
      const keyToType = textToType[0];
      // fetching next key to type and compare with the one
      // given by the user
      if (typedKey === keyToType) {
        setTypedKey({ key: keyToType, isValid: true });
      } else {
        setTypedKey({ key: keyToType, isValid: false });
        // setting errors
        setError(error => error + 1);
      }
      // setting remaining text to type
      const remainingCharacters: string = textToType.substring(1);
      setTextToType(remainingCharacters);
      // if its empty, finish the game
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
  /**
   * Callback used to store a key typed by the user in a queue to be
   * treated by the context
   */
  // store user keys in a queue ready to be consumed
  const typeAKey = useCallback(
    (key: string) => {
      setKeyQueue(keyQueue.concat([key]));
    },
    [setKeyQueue, keyQueue]
  );
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
      validateAKey(nextEventToConsume);
    }
  }, [alreadyTyping, typeAKey, keyQueue, validateAKey]);

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
