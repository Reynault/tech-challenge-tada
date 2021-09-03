import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { parseField } from '../../shared/validators/data-validators';

export interface ViewChallengeFormProps {
  challenge?: ChallengeDto;
}

export const ViewChallengeForm: React.FunctionComponent<ViewChallengeFormProps> = ({
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

  const submitForm = (e: any) => {
    e.preventDefault();
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
  };

  return (
    <form onSubmit={submitForm}>
      <DialogTitle className={classes.centeredElement} id="alert-dialog-title">
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
        <TextField
          disabled={!!challenge}
          className={classes.spacedInput}
          id="name"
          required
          label="Name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <TextField
          className={classes.spacedInput}
          id="description"
          required
          label="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <TextField
          className={classes.spacedInput}
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
          className={classes.spacedInput}
          id="difficulty"
          required
          type="number"
          label="Difficulty"
          value={difficulty}
          onChange={event => setDifficulty(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
