import { Dialog, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';

const dialogStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      width: '100% !important'
    }
  }
}));

export interface SimpleModalProps {
  children: JSX.Element;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const SimpleDialog: React.FunctionComponent<SimpleModalProps> = ({
  children,
  open,
  setOpen
}) => {
  const { root } = dialogStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      className={root}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};
