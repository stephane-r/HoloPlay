// @flow
import * as React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Title from '../../Title';
import Spacer from '../../Spacer';

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
  itemsRenderer?: React.Node | null
};

const HORIZONTAL_ALIGNMENT = 'horizontal';

const CardLayout = ({
  customStyle,
  alignment,
  card,
  children,
  rightContent,
  itemsRenderer,
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
              </View>
              {rightContent && rightContent}
            </View>
          </View>
        </TouchableNativeFeedback>
        {itemsRenderer && itemsRenderer}
      </View>
    </View>
  );
};

CardLayout.defaultProps = {
  alignment: 'vertical',
  itemsRenderer: null
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
