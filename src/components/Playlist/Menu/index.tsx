// @flow
import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';

interface Props {
  onEdit: () => void;
  onRemove: () => void;
}

const PlaylistMenu: React.FC<Props> = ({ onEdit, onRemove }) => {
  const [menuIsOpen, setToggleMenu] = useState<boolean>(false);

  const toggleMenu = (): void => setToggleMenu(!menuIsOpen);

  return (
    <Menu
      visible={menuIsOpen}
      onDismiss={toggleMenu}
      anchor={
        <IconButton
          accessibilityStates={[]}
          icon="dots-vertical"
          size={20}
          onPress={toggleMenu}
        />
      }>
      <Menu.Item
        onPress={() => {
          onEdit();
          toggleMenu();
        }}
        icon="pencil"
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          onRemove();
          toggleMenu();
        }}
        icon="delete"
        title="Remove"
      />
    </Menu>
  );
};

export default PlaylistMenu;
