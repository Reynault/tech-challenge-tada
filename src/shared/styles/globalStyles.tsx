import { makeStyles } from '@material-ui/core';

export const globalStyles = makeStyles(theme => ({
  centeredTitle: {
    textAlign: 'center'
  },
  pageBody: {
    paddingBottom: '90px !important'
  },
  responsiveButton: {
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  spacedForm: {
    '& > *': {
      width: '100%',
      marginBottom: '15px'
    }
  },
  thirdColor: {
    color: '#4caf50'
  },
  overflowedField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  dialogSelectedElementTitle: {
    display: 'inline-block',
    maxWidth: '100%',
    verticalAlign: 'bottom'
  }
}));
