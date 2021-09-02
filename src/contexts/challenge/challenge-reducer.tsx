import { Reducer } from 'react';
import { DefaultChallenges } from '../../assets/data/default-challenges';
import { ChallengeDto } from '../../shared/dto/challenge-dto';

export enum ChallengeActions {
  GET = 'get',
  DELETE_ALL = 'deleteAll',
  SAVE = 'save',
  POPULATE = 'populate'
}

// functions used to manipulate challenges in local storage
const challengesLocation = 'challenges';

// GET
const get = (): ChallengeDto[] => {
  try {
    return JSON.parse(localStorage.getItem(challengesLocation));
  } catch (e) {
    return [];
  }
};

// SAVE
const save = (challenges: ChallengeDto[]): void => {
  localStorage.setItem(challengesLocation, JSON.stringify(challenges));
};

// DELETE ALL
const deleteAll = (): ChallengeDto[] => {
  localStorage.removeItem(challengesLocation);
  return undefined;
};

// populate default challenges
const populate = (): ChallengeDto[] => {
  save(DefaultChallenges);
  return DefaultChallenges;
};

export const initializeChallenges = (): ChallengeDto[] => {
  return get();
};

export const ChallengeReducer: Reducer<ChallengeDto[], ChallengeActions> = (
  state: ChallengeDto[],
  action: ChallengeActions
) => {
  switch (action) {
    case ChallengeActions.GET:
      state = get();
      return state;
    case ChallengeActions.DELETE_ALL:
      state = deleteAll();
      return state;
    case ChallengeActions.SAVE:
      save(state);
      return state;
    case ChallengeActions.POPULATE:
      state = populate();
      return state;
    default:
      return state;
  }
};
