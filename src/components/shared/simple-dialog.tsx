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

/**
 * Component that add a layer of logic on a dialog given by material UI
 * @param children to display
 * @param open a state used to indicate that the dialog must be open
 * @param setOpen setter of open
 */
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
  // is used to set the dialog at fullscreen when on smaller screens
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
