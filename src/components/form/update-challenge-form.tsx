import {
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
import { Display } from '../shared/display';
import { SubmitButtons } from './submit-buttons';

export interface UpdateChallengeFormProps {
  challenge?: ChallengeDto;
}

export const UpdateChallengeForm: React.FunctionComponent<UpdateChallengeFormProps> = ({
  challenge
}) => {
  const { centeredElement, spacedInput } = globalStyles();

  const { dispatch, getOne } = useContext(ChallengesContext);
  const { hideModal } = useContext(DialogContext);

  const [name, setName] = useState(!!challenge?.name ? challenge.name : '');
  const [description, setDescription] = useState(
    !!challenge?.description ? challenge.description : ''
  );
  const [text, setText] = useState(!!challenge?.text ? challenge.text : '');
  const [difficulty, setDifficulty] = useState(
    !!challenge?.difficulty ? challenge.difficulty : 1
  );

  const [alreadyExists, setAlreadyExists] = useState(false);

  const submitForm = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!!getOne(name)) {
        setAlreadyExists(true);
      } else {
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
      }
    },
    [name, description, difficulty, text]
  );

  return (
    <form onSubmit={submitForm}>
      <DialogTitle className={centeredElement} id="alert-dialog-title">
        {!!challenge ? (
          <Display value={`Update ${challenge.name}`} />
        ) : (
          'Insert a challenges'
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          className={spacedInput}
          id="name"
          error={alreadyExists}
          required
          helperText={alreadyExists ? 'This name is already used...' : ''}
          label="Name"
          inputProps={{ maxLength: 32 }}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <TextField
          className={spacedInput}
          id="description"
          required
          label="Description"
          inputProps={{ maxLength: 64 }}
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
          inputProps={{ maxLength: 130000 }}
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
            onChange={(event: any) => setDifficulty(event.target.value)}
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
        <SubmitButtons />
      </DialogActions>
    </form>
  );
};
