// Context definition
import React, { useCallback } from 'react';

export interface FormContextProps {
  submit: () => any;
}

export const FormContext: React.Context<FormContextProps> = React.createContext<
  FormContextProps
>({
  submit: null
});

// Specific provider definition as a component
export interface FormProviderProps {
  children: JSX.Element;
}

export const FormProvider: React.FunctionComponent<FormProviderProps> = ({
  children
}) => {
  const submit = useCallback(() => console.log('submit'), []);
  return (
    <FormContext.Provider value={{ submit }}>{children}</FormContext.Provider>
  );
};
