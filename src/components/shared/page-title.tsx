import { Box, Typography } from '@material-ui/core';
import React from 'react';

export interface PageTitleProps {
  label: string;
}

export const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  label
}) => {
  return (
    <Box p={3}>
      <Typography variant="h3" style={{ textAlign: 'center' }}>
        {label}
      </Typography>
    </Box>
  );
};
