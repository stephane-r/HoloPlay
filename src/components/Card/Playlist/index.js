// @flow
import React, { useState } from 'react';
import { View } from 'react-native';
import Card from '../Layout';
import Text from '../../Text';
import Button from '../../Forms/Button';
import { actions } from '../../../store';
import Spacer from '../../Spacer';
import { CarouselPlayIcon } from '../../Carousel';

type CardPlaylistProps = {
  totalSongs: number,
  playlist: Object,
  toggleModal: Function,
  card: Object
};

const CardPlaylist = ({
  totalSongs,
  playlist,
  toggleModal,
  ...props
}: CardPlaylistProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const removePlaylist = async () => {
    setIsLoading(true);
    await actions.removePlaylist(playlist.id);
    setIsLoading(false);
  };

  return (
    <>
      <Card
        {...props}
        items={playlist.sources}
        rightContent={
          <CarouselPlayIcon onPress={() => alert('run playlist')} />
        }>
        <Text>{totalSongs} songs</Text>
      </Card>
      <View style={{ flexDirection: 'row', marginHorizontal: -8 }}>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Button
            title="Edit playlist"
            onPress={() => toggleModal(playlist)} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Button
            title="Remove playlist"
            isLoading={isLoading}
            onPress={removePlaylist}
          />
        </View>
      </View>
      <Spacer height={40} />
    </>
  );
};

export default CardPlaylist;
