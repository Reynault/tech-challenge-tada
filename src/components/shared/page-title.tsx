import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Display } from './display';

export interface PageTitleProps {
  label: string;
}

export const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  label
}) => {
  return (
    <Box p={3}>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <Display value={label} />
      </Typography>
    </Box>
  );
};
