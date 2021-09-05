import { makeStyles } from '@material-ui/core';

export const globalStyles = makeStyles(theme => ({
  '@global': {
    '@keyframes fadeInTitle': {
      '0%': {
        opacity: '0',
        transform: 'translate(-50%)'
      },
      '100%': {
        opacity: '1'
      }
    },
    '@keyframes fadeInCard': {
      '0%': {
        opacity: '0',
        transform: 'translate(0, 20%)'
      },
      '100%': {
        opacity: '1'
      }
    }
  },
  centeredElement: {
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
  spacedInput: {
    width: '100%',
    marginBottom: '15px'
  },
  flexButtons: {
    justifyContent: 'center',
    display: 'flex',
    gap: '5px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row !important',
      flexWrap: 'wrap',
      gap: '5px',
      '& *': {
        flex: '1 1 100%',
        margin: '0px !important'
      }
    }
  }
}));
