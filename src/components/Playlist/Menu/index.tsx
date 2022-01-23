import React, { memo, useState, useCallback } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface Props {
  onEdit: () => void;
  onRemove: () => void;
}

export const PlaylistMenu: React.FC<Props> = memo(({ onEdit, onRemove }) => {
  const [menuIsOpen, setToggleMenu] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleMenu = useCallback(
    (): void => setToggleMenu(!menuIsOpen),
    [setToggleMenu, menuIsOpen]
  );

  const handleEdit = useCallback(() => {
    onEdit();
    toggleMenu();
  }, [onEdit, toggleMenu]);

  const handleRemove = useCallback(() => {
    onRemove();
    toggleMenu();
  }, [onEdit, toggleMenu]);

  return (
    <Menu
      visible={menuIsOpen}
      onDismiss={toggleMenu}
      anchor={
        <IconButton icon="dots-vertical" size={20} onPress={toggleMenu} />
      }>
      <Menu.Item onPress={handleEdit} icon="pencil" title={t('menu.edit')} />
      <Menu.Item
        onPress={handleRemove}
        icon="delete"
        title={t('menu.delete')}
      />
    </Menu>
  );
});
