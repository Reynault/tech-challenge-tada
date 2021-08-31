import React from 'react';
import { TestContext } from '../contexts/test-context';

export const ViewProfiles: React.FunctionComponent = () => {
  const { test, setTest } = React.useContext(TestContext);
  React.useEffect(() => {
    console.log('HELLO');
    return () => {
      console.log('AU REVOIR');
    };
  });
  React.useCallback(() => {
    setTest(true);
    console.log('UPDATE');
  }, [setTest]);
  return <div>Hello there : {test}</div>;
};
