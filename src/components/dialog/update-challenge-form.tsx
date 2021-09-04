import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { ChallengesContext } from '../../contexts/challenges/challenges-context';
import { ChallengeActionType } from '../../contexts/challenges/challenges-reducer';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { parseField } from '../../shared/validators/data-validators';

export interface UpdateChallengeFormProps {
  challenge?: ChallengeDto;
}

export const UpdateChallengeForm: React.FunctionComponent<UpdateChallengeFormProps> = ({
  challenge
}) => {
  const {
    centeredElement,
    overflowedField,
    spacedInput,
    dialogSelectedElementTitle
  } = globalStyles();

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

  const submitForm = useCallback(
    (e: any) => {
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
    },
    [name, description, difficulty, text]
  );

  return (
    <form onSubmit={submitForm}>
      <DialogTitle className={centeredElement} id="alert-dialog-title">
        {!!challenge ? (
          <span className={`${overflowedField} ${dialogSelectedElementTitle}`}>
            Update {challenge.name}
          </span>
        ) : (
          'Insert a challenges'
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          disabled={!!challenge}
          className={spacedInput}
          id="name"
          required
          label="Name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <TextField
          className={spacedInput}
          id="description"
          required
          label="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <TextField
          className={spacedInput}
          id="text"
          required
          label="Text"
          multiline
          maxRows={8}
          value={text}
          onChange={event => setText(event.target.value)}
          variant="filled"
        />
        <FormControl className={spacedInput}>
          <InputLabel id="difficulty">Difficulty</InputLabel>
          <Select
            id="difficulty"
            labelId="difficulty"
            required
            value={difficulty}
            onChange={event => setDifficulty(event.target.value)}
          >
            <MenuItem value={1}>Super easy</MenuItem>
            <MenuItem value={2}>Easy</MenuItem>
            <MenuItem value={3}>Medium</MenuItem>
            <MenuItem value={4}>Hard</MenuItem>
            <MenuItem value={5}>Super Hard</MenuItem>
          </Select>
        </FormControl>
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
