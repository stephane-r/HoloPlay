import React from 'react';
import Instance from '../../components/Instance';
import { useAppSettings } from '../../providers/App';
import { memo } from 'react';

export const InstanceContainer = memo(props => {
  const { settings } = useAppSettings();

  return <Instance instance={settings.instance} {...props} />;
});
