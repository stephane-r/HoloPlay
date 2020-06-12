import React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Subheading } from 'react-native-paper';
import Spacer from '../../Spacer';
import Label from '../../Label';

interface CardType {
  title: string;
  picture: string;
  duration?: string;
}

interface CardProps {
  customStyle?: {
    [key: string]: string | number;
  };
  alignment: string;
  card: CardType;
  onPress?: (videoIndex: number) => void;
  index?: number;
  rightContent?: any;
  itemsRenderer?: any;
  showItems?: boolean;
  // TODO: refactoring
  isStream?: boolean;
}

const HORIZONTAL_ALIGNMENT = 'horizontal';

const CardLayout: React.FC<CardProps> = ({
  customStyle,
  alignment,
  card,
  children,
  rightContent,
  itemsRenderer,
  showItems,
  ...props
}) => {
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
            <View style={{ position: 'relative' }}>
              <Image
                resizeMode="cover"
                style={pictureStyles}
                source={{ uri: card.picture }}
              />
              {!isHorizontal && (
                <>
                  {card.duration && !props.isStream && (
                    <Label align="left" theme="#0455BF">
                      {card.duration}
                    </Label>
                  )}
                  {props.isStream && (
                    <Label align="right" theme="#2575f4">
                      LIVE
                    </Label>
                  )}
                </>
              )}
            </View>
            <View style={infosStyles}>
              <View style={{ flex: 1 }}>
                <Subheading
                  style={titleStyles}
                  numberOfLines={isHorizontal ? 1 : 2}>
                  {card.title}
                </Subheading>
                {children && (
                  <>
                    {isHorizontal && <Spacer height={5} />}
                    <View style={styles.footer}>{children}</View>
                  </>
                )}
              </View>
              {rightContent && rightContent}
            </View>
          </View>
        </TouchableNativeFeedback>
        {itemsRenderer && showItems && itemsRenderer}
      </View>
    </View>
  );
};

CardLayout.defaultProps = {
  alignment: 'vertical',
  itemsRenderer: null,
  isStream: false
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
    height: 55
  },
  infos: {
    marginTop: -5
  },
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

export { stylesVertical, stylesHorizontal };
export default CardLayout;
