import React from 'react';
import InstanceList from '../../components/InstanceList';
import { useAppSettings } from '../../providers/App';

const InstanceListContainer = () => {
  const { settings } = useAppSettings();

  return <InstanceList customInstances={settings.customInstances} />;
};

export default InstanceListContainer;
