import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DialogContext } from '../../contexts/dialog-context';
import { Routes } from '../../shared/constants/routes';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { parseField } from '../../shared/validators/data-validators';
import { DeleteChallengeForm } from '../dialog/delete-challenge-form';
import { UpdateChallengeForm } from '../dialog/update-challenge-form';
import { Difficulty } from '../difficulty';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  cardButtons: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      flexWrap: 'wrap',
      gap: '5px',
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
    showModal(<UpdateChallengeForm {...{ challenge }} />);
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
        <Difficulty {...{ difficulty: challenge.difficulty }} />
        <Typography
          className={globalClasses.overflowedField}
          variant="body2"
          component="p"
        >
          {parseField(challenge.description)}
        </Typography>
      </CardContent>
      <CardActions className={localClasses.cardButtons}>
        <Button
          variant="contained"
          className={globalClasses.thirdColor}
          component={Link}
          to={`${Routes.PLAY}/${challenge.name}`}
        >
          Play
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
