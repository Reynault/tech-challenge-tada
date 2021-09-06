import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
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
    [theme.breakpoints.down('sm')]: {
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
  const [rows, setRows] = useState([]);
  // callback to build dynamic elements in the list
  const buildElementList = useCallback(() => {
    const l = props.challenges.length;
    const r = [];
    for (let i = 0; i < l; i++) {
      r.push(
        <props.howToDisplay
          key={props.challenges[i].name}
          {...props.challenges[i]}
        />
      );
    }
    setRows(r);
  }, [setRows, props]);

  useEffect(() => {
    buildElementList();
  }, [props, buildElementList]);

  return <Box className={list}>{rows}</Box>;
};
