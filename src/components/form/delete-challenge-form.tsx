import { DialogActions, DialogTitle } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { DialogButtonGroup } from '../button/dialog-button-group';

export interface DeleteChallengeFormProps {
  challenge?: ChallengeDto;
}

export const DeleteChallengeForm: React.FunctionComponent<DeleteChallengeFormProps> = ({
  challenge
}) => {
  const classes = globalStyles();

  const { dispatch } = useContext(ChallengesContext);
  const { hideModal } = useContext(DialogContext);

  const deleteProcedure = useCallback(() => {
    if (!!challenge) {
      dispatch({ type: ChallengeActionType.DELETE, payload: challenge });
    } else {
      dispatch({ type: ChallengeActionType.DELETE_ALL });
    }
    hideModal();
  }, [dispatch, hideModal]);

  return (
    <React.Fragment>
      <DialogTitle className={classes.centeredTitle} id="alert-dialog-title">
        Do you really want to delete{' '}
        {!!challenge ? (
          <span
            className={`${classes.overflowedField} ${classes.dialogSelectedElementTitle}`}
          >
            {challenge.name}
          </span>
        ) : (
          'every challenges'
        )}
        ?
      </DialogTitle>
      <DialogActions>
        <DialogButtonGroup
          submitProcedure={deleteProcedure}
          cancelProcedure={hideModal}
        />
      </DialogActions>
    </React.Fragment>
  );
};
