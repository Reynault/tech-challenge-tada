// Context definition
import React, { useCallback, useState } from 'react';
import { SimpleDialog } from '../components/shared/simple-dialog';

export interface DialogContextProps {
  showDialog: (value: JSX.Element) => void;
  hideDialog: () => void;
  changeContent: (value: JSX.Element) => void;
}

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

export const DialogProvider: React.FunctionComponent<DialogProviderProps> = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const changeContent = useCallback(
    (content: JSX.Element) => {
      setModalContent(content);
    },
    [setModalContent]
  );
  const showDialog = useCallback(
    (content: JSX.Element) => {
      changeContent(content);
      setOpen(true);
    },
    [changeContent, setOpen]
  );
  const hideDialog = useCallback(() => {
    changeContent(<></>);
    setOpen(false);
  }, [changeContent, setOpen]);
  return (
    <DialogContext.Provider value={{ showDialog, hideDialog, changeContent }}>
      <SimpleDialog {...{ open, setOpen }}>{modalContent}</SimpleDialog>
      {children}
    </DialogContext.Provider>
  );
};
