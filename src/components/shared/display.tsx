import { makeStyles } from '@material-ui/core';
import React from 'react';

const displayStyle = makeStyles({
  overflowedField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    maxWidth: '100%',
    verticalAlign: 'bottom'
  }
});

export interface DisplayProps {
  value: string;
}

/**
 * Component used to display a challenge value with overflow
 * @param value to display
 */
export const Display: React.FunctionComponent<DisplayProps> = ({ value }) => {
  const { overflowedField } = displayStyle();
  return <span className={overflowedField}>{!!value ? value : ''}</span>;
};
