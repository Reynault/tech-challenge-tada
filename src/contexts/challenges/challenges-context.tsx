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

export const ChallengeProvider: React.FunctionComponent<ChallengeProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(ChallengesReducer, get());

  const isChallengesEmpty = useCallback((): boolean => {
    return !state || (Array.isArray(state) && state.length === 0);
  }, [state]);

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
