import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { Display } from '../shared/display';
import { Score } from '../shared/score';
import { Stars } from '../shared/stars';
import { ManageOneChallengeButtons } from './manage-one-challenge-buttons';

const challengeCardStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    minWidth: '350px',
    animation: 'fadeInCard 0.5s',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      minWidth: '0px'
    }
  }
}));

export const ChallengeCard: React.FunctionComponent<ChallengeDto> = (
  challenge: ChallengeDto
) => {
  const { root } = challengeCardStyles();
  return (
    <Card className={root}>
      <CardContent>
        <Typography variant="h5">
          <Display value={challenge?.name} />
        </Typography>
        <Score {...challenge?.bestScore} />
        <Stars {...{ value: challenge?.difficulty }} />
        <Typography variant="body1">
          <Display value={challenge?.description} />
        </Typography>
      </CardContent>
      <ManageOneChallengeButtons {...challenge} />
    </Card>
  );
};
