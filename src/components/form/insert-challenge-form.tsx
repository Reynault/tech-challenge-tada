import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { parseField } from '../../shared/validators/data-validators';
import { DialogButtonGroup } from '../button/dialog-button-group';

export interface InsertChallengeFormProps {
  challenge?: ChallengeDto;
}

export const InsertChallengeForm: React.FunctionComponent<InsertChallengeFormProps> = ({
  challenge
}) => {
  const classes = globalStyles();

  const { dispatch } = useContext(ChallengesContext);
  const { hideModal } = useContext(DialogContext);

  const [name, setName] = useState(parseField(challenge?.name));
  const [description, setDescription] = useState(
    parseField(challenge?.description)
  );
  const [text, setText] = useState(parseField(challenge?.text));
  const [difficulty, setDifficulty] = useState(
    parseField(challenge?.difficulty)
  );
  const insertChallenge = useCallback(() => {
    if (!!challenge) {
      dispatch({
        type: ChallengeActionType.PUT,
        payload: {
          name,
          description,
          difficulty,
          text
        },
        old: challenge
      });
    } else {
      dispatch({
        type: ChallengeActionType.POST,
        payload: {
          name,
          description,
          difficulty,
          text
        }
      });
    }
    hideModal();
  }, [dispatch, hideModal]);

  return (
    <React.Fragment>
      <DialogTitle className={classes.centeredTitle} id="alert-dialog-title">
        {!!challenge ? (
          <span
            className={`${classes.overflowedField} ${classes.dialogSelectedElementTitle}`}
          >
            Update {challenge.name}
          </span>
        ) : (
          'Insert a challenges'
        )}
      </DialogTitle>
      <DialogContent>
        <form className={classes.spacedForm} noValidate autoComplete="off">
          <TextField
            id="name"
            required
            label="Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <TextField
            id="description"
            required
            label="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <TextField
            id="text"
            required
            label="Text"
            multiline
            maxRows={8}
            value={text}
            onChange={event => setText(event.target.value)}
            variant="filled"
          />
          <TextField
            id="difficulty"
            required
            type="number"
            label="Difficulty"
            value={difficulty}
            onChange={event => setDifficulty(event.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogButtonGroup
          submitProcedure={insertChallenge}
          cancelProcedure={hideModal}
        />
      </DialogActions>
    </React.Fragment>
  );
};
