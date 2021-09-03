import React, { Dispatch, useCallback, useReducer } from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { ChallengeAction, ChallengesReducer, get } from './challenges-reducer';

// Context definition
export interface ChallengeContextProps {
  state: ChallengeDto[];
  dispatch: Dispatch<ChallengeAction>;
  isChallengesEmpty: (challenges: ChallengeDto[]) => boolean;
  getOne: (challenges: ChallengeDto[], id: string) => ChallengeDto;
}

export const ChallengesContext: React.Context<ChallengeContextProps> = React.createContext<
  ChallengeContextProps
>({
  state: null,
  dispatch: null,
  isChallengesEmpty: null,
  getOne: null
});

// Specific provider definition as a component
export interface ChallengeProviderProps {
  children: JSX.Element;
}

export const ChallengeProvider: React.FunctionComponent<ChallengeProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(ChallengesReducer, get());

  const isChallengesEmpty = useCallback(
    (challenges: ChallengeDto[]): boolean => {
      return (
        !challenges || (Array.isArray(challenges) && challenges.length === 0)
      );
    },
    []
  );

  const getOne = useCallback(
    (challenges: ChallengeDto[], id: string): ChallengeDto => {
      return challenges.find((c: ChallengeDto) => c.name === id);
    },
    []
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
