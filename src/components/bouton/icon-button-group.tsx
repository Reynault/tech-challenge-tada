import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const cardListStyle = makeStyles(theme => ({
  changeDisplayButtons: {
    marginBottom: '15px',
    justifyContent: 'center',
    display: 'flex',
    gap: '15px',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}));

export interface IconButtonGroupProps {
  children: JSX.Element;
}

export const IconButtonGroup: React.FunctionComponent<IconButtonGroupProps> = (
  props: IconButtonGroupProps
) => {
  const classes = cardListStyle();
  return <Box className={classes.changeDisplayButtons}>{props.children}</Box>;
};
