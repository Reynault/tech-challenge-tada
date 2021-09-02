import { makeStyles } from '@material-ui/core';

export const globalStyles = makeStyles(theme => ({
  pageTitle: {
    textAlign: 'center'
  },
  pageBody: {
    paddingBottom: '90px !important'
  },
  responsiveButton: {
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  }
}));
