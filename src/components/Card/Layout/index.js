// @flow
import * as React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Title from '../../Title';
import Spacer from '../../Spacer';
import Text from '../../Text';
import Icon from '../../Icon';
import { actions } from '../../../store';

type CardType = {
  title: string,
  picture: string
};

type CardProps = {
  customStyle?: Object,
  alignment: string,
  card: CardType,
  onPress?: Function,
  index?: Number,
  children?: React.Node,
  rightContent?: React.Node,
  items?: Array<Object>,
  playlistId: Number | null
};

const HORIZONTAL_ALIGNMENT = 'horizontal';

const CardLayout = ({
  customStyle,
  alignment,
  card,
  children,
  rightContent,
  items,
  ...props
}: CardProps) => {
  const isHorizontal = alignment === HORIZONTAL_ALIGNMENT;
  const containerStyles = isHorizontal
    ? stylesHorizontal.container
    : stylesVertical.container;
  const pictureStyles = isHorizontal
    ? stylesHorizontal.picture
    : stylesVertical.picture;
  const cardStyles = isHorizontal ? stylesHorizontal.card : stylesVertical.card;
  const infosStyles = isHorizontal
    ? stylesHorizontal.infos
    : stylesVertical.infos;
  const titleStyles = isHorizontal
    ? stylesHorizontal.title
    : stylesVertical.title;

  return (
    <View style={containerStyles}>
      <View style={[cardStyles, customStyle]}>
        <TouchableNativeFeedback
          onPress={() => props.onPress && props.onPress(props.index)}>
          <View
            style={{
              width: '100%',
              flexDirection: isHorizontal ? 'row' : 'column'
            }}>
            <Image
              resizeMode="cover"
              style={pictureStyles}
              source={{ uri: card.picture }}
            />
            <View style={infosStyles}>
              <View style={{ flex: 1 }}>
                <Title
                  level="3"
                  title={card.title}
                  customStyle={titleStyles} />
                {children && (
                  <>
                    <Spacer height={10} />
                    <View style={styles.footer}>{children}</View>
                  </>
                )}
                <Spacer height={10} />
              </View>
              {rightContent && rightContent}
            </View>
          </View>
        </TouchableNativeFeedback>
        {items &&
          items.map(item => (
            // TODO: Create component for this renderer
            // TODO: Refacto styles
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center'
              }}>
              <TouchableNativeFeedback onPress={() => actions.loadSource()}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Text
                    numberOfLines={1}
                    customStyle={{ width: '90%' }}>
                    {item.title}
                  </Text>
                  <View style={{ marginLeft: 'auto', marginVertical: 5 }}>
                    <Icon
                      name="Play"
                      width={20}
                      height={20} />
                  </View>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() =>
                  actions.removeSourceFromPlaylist({
                    source: item,
                    playlistId: props.playlistId
                  })
                }>
                <View style={{ paddingLeft: 10 }}>
                  <Icon
                    name="ArrowRight"
                    style
                    width={20}
                    height={20} />
                </View>
              </TouchableNativeFeedback>
            </View>
          ))}
        {items && (
          <View style={{ width: '100%' }}>
            <Spacer height={10} />
          </View>
        )}
      </View>
    </View>
  );
};

CardLayout.defaultProps = {
  alignment: 'vertical',
  playlistId: null
};

const stylesVertical = StyleSheet.create({
  container: {
    width: '50%',
    paddingHorizontal: 8,
    paddingBottom: 30
  },
  card: {
    elevation: 2,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10
  },
  title: {
    height: 60
  },
  infos: {},
  picture: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    transform: [{ translateY: -25 }],
    marginBottom: -10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const stylesHorizontal = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  card: {
    elevation: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
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

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default CardLayout;
