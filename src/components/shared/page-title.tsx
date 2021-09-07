import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Display } from './display';

export interface PageTitleProps {
  label: string;
}

/**
 * Component that provides the title of the page
 * @param label the title to display
 */
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
