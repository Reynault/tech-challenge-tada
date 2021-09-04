// Context definition
import React, { useCallback, useState } from 'react';
import { SimpleDialog } from '../components/shared/simple-dialog';
import { ChallengeActionType } from './challenges/challenges-reducer';

export interface CustomField {
  type: 'text' | 'select';
  id: string;
  required: boolean;
  value: any;
}

export interface FormContextProps {
  submit: (values: any) => CustomField[];
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
//
// export const FormProvider: React.FunctionComponent<FormProviderProps> = ({
//   children
// }) => {
//   const submitForm = useCallback((event: any) => {
//     event.preventDefault();
//   }, []);
//
//   return (
//     <FormContext.Provider value={submitForm}>
//       <form onSubmit={submitForm}>{children}</form>
//     </FormContext.Provider>
//   );
// };
