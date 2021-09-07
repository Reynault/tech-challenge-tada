// Context definition
import React, { useCallback, useState } from 'react';
import { SimpleDialog } from '../components/shared/simple-dialog';

export interface DialogContextProps {
  showDialog: (value: JSX.Element) => void;
  hideDialog: () => void;
  changeContent: (value: JSX.Element) => void;
}

/**
 * Dialog context used to show and hide a dialog
 */
export const DialogContext: React.Context<DialogContextProps> = React.createContext(
  {
    showDialog: null,
    hideDialog: null,
    changeContent: null
  }
);

// Specific provider definition as a component
export interface DialogProviderProps {
  children: JSX.Element;
}

/**
 * Component that provides a dialog context with default values
 * and default callbacks
 * @param children to display
 */
export const DialogProvider: React.FunctionComponent<DialogProviderProps> = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  // change dialog content
  const changeContent = useCallback(
    (content: JSX.Element) => {
      setModalContent(content);
    },
    [setModalContent]
  );
  // show the current dialog
  const showDialog = useCallback(
    (content: JSX.Element) => {
      changeContent(content);
      setOpen(true);
    },
    [changeContent, setOpen]
  );
  // hide the current dialog
  const hideDialog = useCallback(() => {
    changeContent(<></>);
    setOpen(false);
  }, [changeContent, setOpen]);
  return (
    <DialogContext.Provider value={{ showDialog, hideDialog, changeContent }}>
      {/* Use a simple dialog from material ui */}
      <SimpleDialog {...{ open, setOpen }}>{modalContent}</SimpleDialog>
      {children}
    </DialogContext.Provider>
  );
};
