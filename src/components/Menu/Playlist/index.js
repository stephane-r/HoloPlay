// @flow
import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';

type MenuPlaylistProps = {
  onEdit: Function,
  onRemove: Function
};

const MenuPlaylist = ({ onEdit, onRemove }: MenuPlaylistProps) => {
  const [menuIsOpen, setToggleMenu] = useState(false);

  const toggleMenu = () => setToggleMenu(!menuIsOpen);

  return (
    <Menu
      visible={menuIsOpen}
      onDismiss={toggleMenu}
      anchor={<IconButton
        icon="more-vert"
        size={20}
        onPress={toggleMenu} />}>
      <Menu.Item
        onPress={() => {
          onEdit();
          toggleMenu();
        }}
        icon="edit"
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

export default MenuPlaylist;
