import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import Spacer from '../Spacer';
import { Video as VideoTypes } from '../../types';

interface Props {
  videos: VideoTypes[];
  playlistId: string;
  onRemove: (videoIndexId: string) => void;
  onPlay: (videoIndex: number) => void;
}

const Video: React.FC<Props> = ({ videos, onPlay, onRemove }) => (
  <>
    {videos.map((video) => (
      <View key={video.videoId} style={styles.container}>
        <View style={styles.line}>
          <Text
            accessibilityStates={[]}
            numberOfLines={1}
            style={{ width: '75%', flex: 1 }}>
            {video.title}
          </Text>
          <IconButton
            accessibilityStates={[]}
            icon="play-circle-outline"
            size={25}
            style={{ margin: 6 }}
            onPress={(): void => onPlay(video.index)}
          />
          <IconButton
            accessibilityStates={[]}
            icon="delete"
            size={20}
            style={{ margin: 0 }}
            onPress={(): void => onRemove(video.indexId ?? null)}
          />
        </View>
        {video.index + 1 < videos.length && (
          <View style={{ width: '100%', height: 1 }}>
            <Divider accessibilityStates={[]} />
          </View>
        )}
      </View>
    ))}
    <View style={{ width: '100%' }}>
      <Spacer height={10} />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Video;
