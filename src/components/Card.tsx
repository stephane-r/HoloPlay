import React, { memo, useState } from 'react';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { Image } from 'react-native';
import timeFormat from 'hh-mm-ss';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { IconButton, Subheading, useTheme } from 'react-native-paper';
import { DASHBOARD_COLOR } from '../../config/theme';
import Label from './Label';
import Favoris, { ButtonFavorite } from './Favoris/Button';
import { useFavorite } from '../providers/Favorite';
import { DialogAddVideoToPlaylist } from './Dialog/AddVideoToPlaylist';
import { useCallback } from 'react';

const formatCard = data => ({
  title: data.title,
  picture:
    data.videoThumbnails?.find(q => q.quality === 'medium').url ||
    data?.playlistThumbnail,
  duration:
    data.type === 'playlist'
      ? `${data.videos.length} videos`
      : data.lengthSeconds
      ? timeFormat.fromS(data?.lengthSeconds)
      : null,
  liveNow: data.liveNow
});

export const Card = memo(({ data, onPress }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const card = formatCard(data);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <TouchableNativeFeedback onPress={() => onPress()}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column'
            }}>
            <View style={{ position: 'relative' }}>
              <CardImage uri={card.picture} />
              {card.liveNow ? (
                <Label align="right" theme={DASHBOARD_COLOR}>
                  LIVE
                </Label>
              ) : null}
              {card.duration ? (
                <Label align="left" theme="#0455BF">
                  {card.duration}
                </Label>
              ) : null}
            </View>
            <View style={styles.infos}>
              <View style={{ flex: 1 }}>
                <CardTitle>{card.title}</CardTitle>
                {card.type !== 'playlist' ? (
                  <View style={styles.footer}>
                    <CardFavorite data={data} />
                    <CardPlus data={data} />
                  </View>
                ) : null}
              </View>
            </View>
            {loading && <CardLoading />}
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
});

const CardImage = memo(({ uri }) => {
  return <Image resizeMode="cover" style={styles.picture} source={{ uri }} />;
});

const CardTitle = memo(({ children }) => {
  return (
    <Subheading style={styles.title} numberOfLines={2}>
      {children}
    </Subheading>
  );
});

const CardFavorite = memo(({ data }) => {
  const { state } = useFavorite();

  return (
    <ButtonFavorite
      favorisPlaylist={state.favorisPlaylist}
      favorisIds={state.favorisIds}
      video={data}
      buttonWithIcon
      // color={favorisButtonColor}
    />
  );
});

const CardPlus = memo(({ data }) => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );

  return (
    <>
      <IconButton icon="plus" size={22} onPress={() => toggleDialog()} />
      <DialogAddVideoToPlaylist
        toggleDialog={toggleDialog}
        visible={visible}
        video={data}
      />
    </>
  );
});

export const CardLoading = memo(() => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: isHorizontal ? '100%' : '120%',
        top: isHorizontal ? 0 : -25,
        backgroundColor: 'rgba(255, 255, 255, .6)'
      }}>
      <ActivityIndicator />
    </View>
  );
});

export const CardPlaceholder = memo(() => {
  return (
    <View style={[styles.container]}>
      <View style={styles.card}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column'
          }}>
          <Placeholder Animation={Fade}>
            <PlaceholderLine
              width={100}
              height={100}
              style={{ borderRadius: 0, ...styles.picture }}
            />
          </Placeholder>
          <View style={styles.infos}>
            <View style={{ flex: 1 }}>
              <Placeholder Animation={Fade}>
                <PlaceholderLine width={100} />
                <PlaceholderLine width={100} />
              </Placeholder>
            </View>
            <Placeholder Animation={Fade} style={{ padding: 0, marginTop: 25 }}>
              <PlaceholderLine width={40} />
            </Placeholder>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 30
  },
  card: {
    elevation: 2,
    flex: 1,
    borderRadius: 4,
    padding: 10
  },
  title: {
    height: 55
  },
  infos: {
    marginTop: -5
  },
  picture: {
    width: '100%',
    height: 130,
    borderRadius: 4,
    transform: [{ translateY: -25 }],
    marginBottom: -10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    margin: -8
  }
});
