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
    },
    '@keyframes blur': {
      '0%': {
        filter: 'blur(4px)'
      },
      '100%': {
        filter: 'blur(0px)'
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
  thirdColor: {
    backgroundColor: '#4caf50'
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
