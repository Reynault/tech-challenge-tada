import { Box } from '@material-ui/core';
import React from 'react';

export interface EmptyListProps {
  label: string;
}

export const EmptyList: React.FunctionComponent<EmptyListProps> = ({
  label
}) => {
  return (
    <Box>
      <p>{label}</p>
    </Box>
  );
};
