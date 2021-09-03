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
import { ViewChallengeForm } from '../form/view-challenge-form';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  cardButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '5px',
    '& *': {
      flex: '1 1 25%'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      '& *': {
        flex: '1 1 100%',
        margin: '0px !important'
      }
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
    showModal(<ViewChallengeForm {...{ challenge }} />);
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
      <CardActions className={localClasses.cardButtons}>
        <Button variant="contained" className={globalClasses.thirdColor}>
          View
        </Button>
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
