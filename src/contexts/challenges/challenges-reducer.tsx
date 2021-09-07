import { Reducer } from 'react';
import { DefaultChallenges } from '../../assets/data/default-challenges';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
// available actions
export enum ChallengeActionType {
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
  POPULATE = 'populate'
}
// an action is defined by an action type, a payload and the modified challenge (old)
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
  return state.concat([payload]);
};

// PUT
const put = (
  state: ChallengeDto[],
  payload: ChallengeDto,
  old: ChallengeDto
): ChallengeDto[] => {
  if (payload.text === old.text && !payload.bestScore && !!old.bestScore) {
    payload.bestScore = old.bestScore;
  }
  return state.map((c: ChallengeDto) => (c.name === old.name ? payload : c));
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

/**
 * Defining challenges reducer
 * @param state the current state of the challenges list
 * @param action to process
 */
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
      state = post(state, action.payload);
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
