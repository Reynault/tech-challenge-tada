import { Box, Button, makeStyles } from '@material-ui/core';
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

export const ButtonGroup: React.FunctionComponent = () => {
  const classes = buttonGroupStyle();
  return (
    <Box className={classes.list}>
      <Button color="primary" variant="contained">
        Play
      </Button>
      <Button color="primary" variant="contained">
        Update
      </Button>
      <Button color="secondary" variant="contained">
        Delete
      </Button>
    </Box>
  );
};
