import { Reducer } from 'react';
import { TypedKey } from './game-context';
// available actions
export enum GameActionType {
  LAUNCH = 'launch',
  RESET = 'reset',
  TYPE = 'type'
}
// game dto
export interface GameDto {
  launched: boolean; // if the game is launched
  typedKey: TypedKey; // last key typed and if it is valid or not
  textToType: string; // remaining text to type
  initialText: string; // initial text to type
  finished: boolean; // if the game is finished
  error: number; // the number of errors made by the user
  startingTime: number; // when the game started, use to compute the time
}
// an action is defined by an action type, a payload and the modified challenge (old)
export interface GameAction {
  type: GameActionType;
  key?: string;
}
/**
 * Method used to reset the game
 */
const resetGame = (state: GameDto): GameDto => {
  const newState = Object.assign({}, state);
  newState.launched = false;
  newState.error = 0;
  newState.typedKey = null;
  newState.textToType = state.initialText;
  return newState;
};
/**
 * Method used to launch the game
 */
const launchGame = (state: GameDto): GameDto => {
  const newState = Object.assign({}, state);
  newState.launched = true;
  newState.finished = false;
  newState.error = 0;
  newState.typedKey = null;
  newState.textToType = state.initialText;
  newState.startingTime = Date.now();
  return newState;
};
/**
 * Method used to validate a key given by the user
 */
const typeKey = (state: GameDto, typedKey: string): GameDto => {
  const newState = Object.assign({}, state);
  // indicates to the context that a key is already being processed
  const keyToType = state.textToType[0];
  // fetching next key to type and compare with the one
  // given by the user
  if (typedKey === keyToType) {
    newState.typedKey = { key: keyToType, isValid: true };
  } else {
    newState.typedKey = { key: keyToType, isValid: false };
    // setting errors
    newState.error = state.error + 1;
  }
  // setting remaining text to type
  const remainingCharacters: string = state.textToType.substring(1);
  newState.textToType = remainingCharacters;
  // if its empty, finish the game
  if (!remainingCharacters) {
    newState.launched = false;
    newState.finished = true;
  }
  return newState;
};

export const GameReducer: Reducer<GameDto, GameAction> = (
  state: GameDto,
  action: GameAction
) => {
  switch (action.type) {
    case GameActionType.LAUNCH:
      state = launchGame(state);
      break;
    case GameActionType.RESET:
      state = resetGame(state);
      break;
    case GameActionType.TYPE:
      state = typeKey(state, action.key);
      break;
    default:
      console.error("Couldn't understand the action given to Game Reducer.");
      break;
  }
  // saving state
  return state;
};
