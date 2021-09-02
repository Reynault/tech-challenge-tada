import React, { useCallback, useReducer } from 'react';
import { ChallengeDto } from '../shared/dto/challenge-dto';
import {
  ChallengeActions,
  ChallengeReducer,
  initializeChallenges
} from './challenge-reducer';

// Context definition
export interface ChallengeContextProps {
  challenges: ChallengeDto[];
  populate: () => void;
  save: () => void;
  deleteAll: () => void;
}

export const ChallengeContext: React.Context<ChallengeContextProps> = React.createContext<
  ChallengeContextProps
>({
  challenges: null,
  populate: null,
  save: null,
  deleteAll: null
});

// Specific provider definition as a component
export interface ChallengeProviderProps {
  children: JSX.Element;
}

export const ChallengeProvider: React.FunctionComponent<ChallengeProviderProps> = (
  props: ChallengeProviderProps
) => {
  const [state, dispatch] = useReducer(
    ChallengeReducer,
    initializeChallenges()
  );

  const populate = useCallback(() => dispatch(ChallengeActions.POPULATE), [
    dispatch
  ]);

  const save = useCallback(() => dispatch(ChallengeActions.SAVE), [dispatch]);

  const deleteAll = useCallback(() => dispatch(ChallengeActions.DELETE_ALL), [
    dispatch
  ]);

  return (
    <ChallengeContext.Provider
      value={{
        challenges: state,
        populate: populate,
        save: save,
        deleteAll: deleteAll
      }}
    >
      {props.children}
    </ChallengeContext.Provider>
  );
};
