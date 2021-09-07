import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { GameActionType, GameDto, GameReducer } from './game-reducer';

export interface TypedKey {
  key: string;
  isValid: boolean;
}

export interface GameContextProps {
  launchGame: () => void; // method to launch a game
  resetGame: () => void; // method to reset a game
  typeAKey: (key: string) => void; // when the user wants to type a key
  state: GameDto; // state of the game
}

/**
 * Defining game context which define a game state
 */
export const GameContext: React.Context<GameContextProps> = React.createContext(
  {
    launchGame: null,
    resetGame: null,
    typeAKey: null,
    state: null
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
  // initial state of the game
  const initialState: GameDto = {
    typedKey: null,
    initialText: initialText,
    textToType: initialText,
    error: 0,
    finished: false,
    launched: false,
    startingTime: 0
  };
  const [state, dispatch] = useReducer(GameReducer, initialState);
  // typed key queue use to store pending keys
  const [keyQueue, setKeyQueue] = useState([]);
  // boolean used to check whether a key is already being treated or not
  const [alreadyTyping, setAlreadyTyping] = useState(false);
  /**
   * Callback used to reset the game
   */
  const resetGame = useCallback(() => {
    dispatch({ type: GameActionType.RESET });
  }, [dispatch]);
  /**
   * Callback used to launch the game
   */
  const launchGame = useCallback(() => {
    dispatch({ type: GameActionType.LAUNCH });
  }, [dispatch]);
  /**
   * Callback used to validate a key given by the user
   */
  const validateAKey = useCallback(
    (typedKey: string) => {
      // indicates to the context that a key is already being processed
      setAlreadyTyping(true);
      dispatch({ type: GameActionType.TYPE, key: typedKey });
      setAlreadyTyping(false);
    },
    [dispatch, setAlreadyTyping]
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
        state,
        launchGame,
        resetGame,
        typeAKey
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
