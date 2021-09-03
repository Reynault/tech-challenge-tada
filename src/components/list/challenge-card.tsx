import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { DialogContext } from '../../contexts/dialog-context';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { parseField } from '../../shared/validators/data-validators';
import { DeleteChallengeForm } from '../form/delete-challenge-form';
import { InsertChallengeForm } from '../form/insert-challenge-form';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  }
}));

export const ChallengeCard: React.FunctionComponent<ChallengeDto> = (
  challenge: ChallengeDto
) => {
  const localClasses = challengeCardStyles();
  const globalClasses = globalStyles();
  const { showModal } = useContext(DialogContext);
  const openUpdateModal = useCallback(() => {
    showModal(<InsertChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);

  return (
    <Card className={localClasses.root}>
      <CardContent>
        <Typography
          className={globalClasses.overflowedField}
          variant="h5"
          component="h2"
        >
          {parseField(challenge.name)}
        </Typography>
        <Typography
          className={globalClasses.overflowedField}
          color="textSecondary"
        >
          {parseField(challenge.difficulty)}
        </Typography>
        <Typography
          className={globalClasses.overflowedField}
          variant="body2"
          component="p"
        >
          {parseField(challenge.description)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Play</Button>
        <Button onClick={openUpdateModal} color="primary" variant="contained">
          Update
        </Button>
        <Button onClick={openDeleteModal} color="secondary" variant="contained">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
