import React, { Dispatch, useCallback, useReducer } from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { ChallengeAction, ChallengesReducer, get } from './challenges-reducer';

// Context definition
export interface ChallengeContextProps {
  state: ChallengeDto[];
  dispatch: Dispatch<ChallengeAction>;
  isChallengesEmpty: () => boolean;
  getOne: (id: string) => ChallengeDto;
}

/**
 * Challenge context that provides access to challenges stored
 * locally
 */
export const ChallengesContext: React.Context<ChallengeContextProps> = React.createContext(
  {
    state: null,
    dispatch: null,
    isChallengesEmpty: null,
    getOne: null
  }
);

// Specific provider definition as a component
export interface ChallengeProviderProps {
  children: JSX.Element;
}

/**
 * Component that provides a challenge context with default
 * values and default callbacks
 * @param children to display
 */
export const ChallengeProvider: React.FunctionComponent<ChallengeProviderProps> = ({
  children
}) => {
  // use a reducer which provides procedures to access and update
  // locally stored challenges
  const [state, dispatch] = useReducer(ChallengesReducer, get());
  // callback used to check if the list of challenges
  // is empty
  const isChallengesEmpty = useCallback((): boolean => {
    return !state || (Array.isArray(state) && state.length === 0);
  }, [state]);
  // callback used to get one specific challenge
  const getOne = useCallback(
    (id: string): ChallengeDto => {
      return state.find((c: ChallengeDto) => c.name === id);
    },
    [state]
  );
  return (
    <ChallengesContext.Provider
      value={{
        state,
        dispatch,
        isChallengesEmpty,
        getOne
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
