import React from 'react';

export interface TestContextProps {
  test: boolean;
  setTest: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TestContext = React.createContext<TestContextProps>({
  test: null,
  setTest: null
});

export interface TestContextProviderProps {
  children: any;
  values?: any;
}

export const TestContextProvider: React.FunctionComponent<TestContextProviderProps> = ({
  children
}) => {
  const [test, setTest] = React.useState<boolean>(false);
  return (
    <TestContext.Provider
      value={{
        test,
        setTest
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
