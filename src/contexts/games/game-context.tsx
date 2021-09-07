import React, { useCallback, useReducer } from 'react';
import { GameActionType, GameDto, GameReducer } from './game-reducer';

export interface TypedKey {
  key: string;
  isValid: boolean;
}

export interface GameContextProps {
  launchGame: (key?: string) => void; // method to launch a game
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
  /**
   * Callback used to reset the game
   */
  const resetGame = useCallback(() => {
    dispatch({ type: GameActionType.RESET });
  }, [dispatch]);
  /**
   * Callback used to launch the game
   */
  const launchGame = useCallback(
    (key?: string) => {
      dispatch({ type: GameActionType.LAUNCH, key });
    },
    [dispatch]
  );
  /**
   * Callback used to validate a key given by the user
   */
  const typeAKey = useCallback(
    (typedKey: string) => {
      dispatch({ type: GameActionType.TYPE, key: typedKey });
    },
    [dispatch]
  );

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
