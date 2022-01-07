import React, { memo } from 'react';
import { CardLayout } from './Card';

export const CardSearch = memo(props => {
  return <CardLayout {...props} />;
});
