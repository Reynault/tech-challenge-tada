import { DialogActions, DialogTitle } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { Display } from '../shared/display';
import { SubmitButtons } from './submit-buttons';

export interface DeleteChallengeFormProps {
  challenge?: ChallengeDto;
}

/**
 * Form used to delete a challenge
 * @param challenge to delete
 */
export const DeleteChallengeForm: React.FunctionComponent<DeleteChallengeFormProps> = ({
  challenge
}) => {
  const { centeredElement } = globalStyles();

  const { dispatch } = useContext(ChallengesContext);
  const { hideDialog } = useContext(DialogContext);
  // callback used to delete a challenge using dispatch
  const deleteProcedure = useCallback(() => {
    if (!!challenge) {
      dispatch({ type: ChallengeActionType.DELETE, payload: challenge });
    } else {
      dispatch({ type: ChallengeActionType.DELETE_ALL });
    }
    hideDialog();
  }, [challenge, dispatch, hideDialog]);

  return (
    <form onSubmit={deleteProcedure}>
      <DialogTitle className={centeredElement} id="alert-dialog-title">
        Do you really want to delete{' '}
        {!!challenge ? <Display value={challenge.name} /> : 'every challenges'}?
      </DialogTitle>
      <DialogActions>
        <SubmitButtons />
      </DialogActions>
    </form>
  );
};
