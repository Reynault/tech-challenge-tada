import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';
import React from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { parseField } from '../../shared/validators/data-validators';
import { ButtonGroup } from '../bouton/button-group';

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
  props: ChallengeDto
) => {
  const classes = challengeCardStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {parseField(props.name)}
        </Typography>
        <Typography color="textSecondary">
          {parseField(props.difficulty)}
        </Typography>
        <Typography variant="body2" component="p">
          {parseField(props.description)}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup />
      </CardActions>
    </Card>
  );
};
