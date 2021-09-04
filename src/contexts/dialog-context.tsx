// Context definition
import React, { useCallback, useState } from 'react';
import { SimpleDialog } from '../components/shared/simple-dialog';

export interface ModalContextProps {
  showModal: (value: JSX.Element) => void;
  hideModal: () => void;
  changeContent: (value: JSX.Element) => void;
}

export const DialogContext: React.Context<ModalContextProps> = React.createContext<
  ModalContextProps
>({
  showModal: null,
  hideModal: null,
  changeContent: null
});

// Specific provider definition as a component
export interface ModalProviderProps {
  children: JSX.Element;
}

export const ModalProvider: React.FunctionComponent<ModalProviderProps> = ({
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
  const showModal = useCallback(
    (content: JSX.Element) => {
      changeContent(content);
      setOpen(true);
    },
    [changeContent, setOpen]
  );
  const hideModal = useCallback(() => {
    changeContent(<></>);
    setOpen(false);
  }, [setOpen]);
  return (
    <DialogContext.Provider value={{ showModal, hideModal, changeContent }}>
      <SimpleDialog {...{ open, setOpen }}>{modalContent}</SimpleDialog>
      {children}
    </DialogContext.Provider>
  );
};
