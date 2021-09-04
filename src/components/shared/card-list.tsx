import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';

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

export interface CardListProps<Datatype> {
  dataToDisplay: Datatype[];
  howToDisplay: React.FunctionComponent<Datatype>;
}

export const CardList: React.FunctionComponent<CardListProps<any>> = (
  props: CardListProps<any>
) => {
  const { list } = cardListStyle();
  const rows: JSX.Element[] = [];
  // callback to build dynamic elements in the list
  const buildElementList = useCallback(() => {
    const l = props.dataToDisplay.length;
    for (let i = 0; i < l; i++) {
      rows.push(<props.howToDisplay key={i} {...props.dataToDisplay[i]} />);
    }
  }, [rows]);
  buildElementList();
  return (
    <>
      <Box className={list}>{rows}</Box>
    </>
  );
};
