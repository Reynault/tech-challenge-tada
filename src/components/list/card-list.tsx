import { Box, Button, makeStyles } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import ReorderIcon from '@material-ui/icons/Reorder';
import React, { useCallback, useState } from 'react';
import { SimpleButtonGroup } from '../button/simple-button-group';

const cardListStyle = makeStyles(theme => ({
  changeDisplayButtons: {
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    '& *': {
      flex: '1 1 30%'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      '& *': {
        flex: '1 1 100%'
      }
    }
  },
  classicList: {
    flexDirection: 'column'
  },
  shrankList: {
    flexDirection: 'row'
  }
}));

export interface CardListProps<Datatype> {
  dataToDisplay: Datatype[];
  howToDisplay: React.FunctionComponent<Datatype>;
}

export const CardList: React.FunctionComponent<CardListProps<any>> = (
  props: CardListProps<any>
) => {
  const classes = cardListStyle();
  const rows: JSX.Element[] = [];
  // how to display them
  const [displayAsList, setDisplayAsList] = useState(false);
  // callback to change setDisplay
  const setDisplayToList = useCallback(() => {
    setDisplayAsList(false);
  }, [setDisplayAsList]);
  // callback to build dynamic elements in the list
  const buildElementList = useCallback(() => {
    for (let i = 0; i < props.dataToDisplay.length; i++) {
      rows.push(
        <props.howToDisplay key={i} id={i} {...props.dataToDisplay[i]} />
      );
    }
  }, [rows]);
  buildElementList();
  return (
    <React.Fragment>
      <SimpleButtonGroup>
        <React.Fragment>
          <Button
            className={classes.changeDisplayButtons}
            variant="outlined"
            onClick={setDisplayToList}
          >
            <AppsIcon />
          </Button>
          <Button
            className={classes.changeDisplayButtons}
            variant="outlined"
            onClick={() => setDisplayAsList(true)}
          >
            <ReorderIcon />
          </Button>
        </React.Fragment>
      </SimpleButtonGroup>
      <Box
        className={`${classes.list} ${
          displayAsList ? classes.classicList : classes.shrankList
        }`}
      >
        {rows}
      </Box>
    </React.Fragment>
  );
};
