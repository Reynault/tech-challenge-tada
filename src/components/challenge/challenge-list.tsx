import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { ChallengeDto } from '../../shared/dto/challenge-dto';

const cardListStyle = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    '& > *': {
      flex: '1 1 30%'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      '& *': {
        flex: '1 1 100%'
      }
    }
  }
}));

export interface ChallengeListProps {
  challenges: ChallengeDto[];
  howToDisplay: React.FunctionComponent<ChallengeDto>;
}

export const ChallengeList: React.FunctionComponent<ChallengeListProps> = (
  props: ChallengeListProps
) => {
  const { list } = cardListStyle();
  const rows: JSX.Element[] = [];
  // callback to build dynamic elements in the list
  const buildElementList = useCallback(() => {
    const l = props.challenges.length;
    for (let i = 0; i < l; i++) {
      rows.push(
        <props.howToDisplay
          key={props.challenges[i].name}
          {...props.challenges[i]}
        />
      );
    }
  }, [rows]);
  buildElementList();
  return (
    <>
      <Box className={list}>{rows}</Box>
    </>
  );
};