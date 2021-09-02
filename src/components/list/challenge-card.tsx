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
import { CardGroupButton } from '../bouton/card-group-button';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  overflowedField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}));

export const ChallengeCard: React.FunctionComponent<ChallengeDto> = ({
  name,
  description,
  difficulty
}) => {
  const classes = challengeCardStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.overflowedField}
          variant="h5"
          component="h2"
        >
          {parseField(name)}
        </Typography>
        <Typography className={classes.overflowedField} color="textSecondary">
          {parseField(difficulty)}
        </Typography>
        <Typography
          className={classes.overflowedField}
          variant="body2"
          component="p"
        >
          {parseField(description)}
        </Typography>
      </CardContent>
      <CardActions>
        <CardGroupButton />
      </CardActions>
    </Card>
  );
};
