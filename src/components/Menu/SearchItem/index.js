// @flow
import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';

type MenuSearchItemProps = {
  addToPlaylist: Function,
  downloadFile: Function
};

const MenuSearchItem = ({
  addToPlaylist,
  downloadFile
}: MenuSearchItemProps) => {
  const [menuIsOpen, setToggleMenu] = useState(false);

  const toggleMenu = () => setToggleMenu(!menuIsOpen);

  return (
    <Menu
      visible={menuIsOpen}
      onDismiss={toggleMenu}
      anchor={
        <IconButton icon="dots-vertical" size={20} onPress={toggleMenu} />
      }>
      <Menu.Item
        title="Add to playlist"
        icon="plus"
        onPress={() => {
          addToPlaylist();
          toggleMenu();
        }}
      />
      <Menu.Item
        title="Download"
        icon="file-download"
        onPress={() => {
          downloadFile();
          toggleMenu();
        }}
      />
    </Menu>
  );
};

export default MenuSearchItem;
