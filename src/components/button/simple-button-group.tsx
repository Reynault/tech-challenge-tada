import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const buttonGroupStyle = makeStyles(theme => ({
  list: {
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
        flex: '1 1 100%'
      }
    }
  }
}));

export interface SimpleGroupButtonProps {
  children: JSX.Element;
}

export const SimpleButtonGroup: React.FunctionComponent<SimpleGroupButtonProps> = ({
  children
}) => {
  const classes = buttonGroupStyle();
  return <Box className={classes.list}>{children}</Box>;
};
