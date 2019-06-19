// @flow
import React from 'react';
import { List, Divider, TouchableRipple } from 'react-native-paper';

type SettingsProfilProps = {
  user: Object,
  toggleDialogName: Function,
  toggleDialogEmail: Function
};

const SettingsProfil = ({
  user,
  toggleDialogName,
  toggleDialogEmail
}: SettingsProfilProps) => (
  <>
    <TouchableRipple onPress={toggleDialogName}>
      <List.Item
        title="Your name"
        description={user.username} />
    </TouchableRipple>
    <Divider />
    <TouchableRipple onPress={toggleDialogEmail}>
      <List.Item
        title="Email"
        description={user.email} />
    </TouchableRipple>
    <Divider />
    <TouchableRipple onPress={() => alert('soon')}>
      <List.Item
        title="Password"
        description="**************" />
    </TouchableRipple>
  </>
);

export default SettingsProfil;
