import React, { Children, memo, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Text
} from 'react-native';
import { Subheading, useTheme } from 'react-native-paper';
import { CardLoading } from './Card';
import { useTranslation } from 'react-i18next';
import { VideoListDraggable, VideoList } from './Video';
import { PlaylistActions } from './CapsulePlaylist';

export const Capsule: React.FC = memo(
  ({ data, onPress, children: childrenProp }) => {
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const children = Children.toArray(childrenProp);
    const video = children.find(
      child => child.type === VideoListDraggable || child.type === VideoList
    );
    const buttonPlay = children.find(child => child.type === PlaylistActions);
    const totalSongs = children.find(child => child.type === CapsuleTotalSongs);

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface
            }
          ]}>
          <TouchableNativeFeedback onPress={() => onPress()}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row'
              }}>
              <View style={{ position: 'relative' }}>
                <Image
                  resizeMode="cover"
                  style={styles.picture}
                  source={{ uri: data.picture }}
                />
              </View>
              <View style={styles.infos}>
                <View style={{ flex: 1 }}>
                  <Subheading style={styles.title} numberOfLines={1}>
                    {data.title}
                  </Subheading>
                  <View style={styles.footer}>{totalSongs}</View>
                </View>
                {buttonPlay}
              </View>
              {loading && <CardLoading />}
            </View>
          </TouchableNativeFeedback>
          {video}
        </View>
      </View>
    );
  }
);

export const CapsuleTotalSongs = memo(({ totalSongs }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Text style={{ color: colors.text }}>
      {totalSongs} {t('playlists.song')}
      {totalSongs > 1 && 's'}
    </Text>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  card: {
    elevation: 4,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20
  },
  title: {},
  picture: {
    width: 80,
    height: 80,
    borderRadius: 4,
    transform: [{ translateY: -10 }]
  },
  infos: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
