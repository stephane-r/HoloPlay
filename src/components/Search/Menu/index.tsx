import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';

interface Props {
  addToPlaylist: () => void;
  downloadFile: () => void;
}

const MenuSearchItem: React.FC<Props> = ({ addToPlaylist, downloadFile }) => {
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
        title="Add to playlist"
        icon="plus"
        onPress={(): void => {
          addToPlaylist();
          toggleMenu();
        }}
      />
      <Menu.Item
        title="Download"
        icon="file-download"
        onPress={(): void => {
          downloadFile();
          toggleMenu();
        }}
      />
    </Menu>
  );
};

export default MenuSearchItem;
