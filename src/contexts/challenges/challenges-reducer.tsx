import { Reducer } from 'react';
import { DefaultChallenges } from '../../assets/data/default-challenges';
import { ChallengeDto } from '../../shared/dto/challenge-dto';

export enum ChallengeActionType {
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
  POPULATE = 'populate'
}

export interface ChallengeAction {
  type: ChallengeActionType;
  payload?: ChallengeDto;
  old?: ChallengeDto;
}

// functions used to manipulate challenges in local storage
const challengesLocation = 'challenges';

// SAVE
const save = (state: ChallengeDto[]): ChallengeDto[] => {
  localStorage.setItem(challengesLocation, JSON.stringify(state));
  return state;
};

// POST
const post = (state: ChallengeDto[], payload: ChallengeDto): ChallengeDto[] => {
  state.push(payload);
  return state;
};

// PUT
const put = (
  state: ChallengeDto[],
  payload: ChallengeDto,
  old: ChallengeDto
): ChallengeDto[] => {
  const indexOfOldChallenge = state.findIndex(
    (challenge: ChallengeDto) => challenge.name === old.name
  );
  if (indexOfOldChallenge >= 0) {
    state[indexOfOldChallenge] = payload;
  }
  return state;
};

// DELETE ALL
const deleteAll = (): ChallengeDto[] => {
  return [];
};

// DELETE
const deleteOne = (
  state: ChallengeDto[],
  challenge: ChallengeDto
): ChallengeDto[] => {
  state = state.filter((c: ChallengeDto) => c.name !== challenge.name);
  return state;
};

// POPULATE
const populate = (): ChallengeDto[] => {
  save(DefaultChallenges);
  return DefaultChallenges;
};

// GET
export const get = (): ChallengeDto[] => {
  try {
    return JSON.parse(localStorage.getItem(challengesLocation));
  } catch (e) {
    return [];
  }
};

// Defining challenges reducer
export const ChallengesReducer: Reducer<ChallengeDto[], ChallengeAction> = (
  state: ChallengeDto[],
  action: ChallengeAction
) => {
  switch (action.type) {
    case ChallengeActionType.DELETE_ALL:
      state = deleteAll();
      break;
    case ChallengeActionType.DELETE:
      state = deleteOne(state, action.payload);
      break;
    case ChallengeActionType.POST:
      post(state, action.payload);
      break;
    case ChallengeActionType.PUT:
      state = put(state, action.payload, action.old);
      break;
    case ChallengeActionType.POPULATE:
      state = populate();
      break;
    default:
      console.error(
        "Couldn't understand the action given to Challenge Reducer."
      );
      break;
  }
  // saving state
  save(state);
  return state;
};
