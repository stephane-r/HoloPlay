import React from 'react';
import Profil from '../../components/Profil';
import { useAppSettings } from '../../providers/App';
import { memo } from 'react';

export const ProfilContainer = memo(() => {
  const { settings } = useAppSettings();

  return <Profil username={settings.username} />;
});
