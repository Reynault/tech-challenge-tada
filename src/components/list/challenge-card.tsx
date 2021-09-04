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
import { Stars } from '../stars';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '250px',
    animation: 'fadeInCard 0.5s',
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
  const { root, cardButtons } = challengeCardStyles();
  const { overflowedField, thirdColor } = globalStyles();
  const { showModal } = useContext(DialogContext);
  const openUpdateModal = useCallback(() => {
    showModal(<UpdateChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);

  return (
    <Card className={root}>
      <CardContent>
        <Typography className={overflowedField} variant="h5">
          {parseField(challenge.name)}
        </Typography>
        <Stars {...{ value: challenge.difficulty }} />
        <Typography className={overflowedField} variant="body1">
          {parseField(challenge.description)}
        </Typography>
      </CardContent>
      <CardActions className={cardButtons}>
        <Button
          variant="contained"
          className={thirdColor}
          component={Link}
          to={`${Routes.PLAY_SELECTION}/${challenge.name}`}
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
