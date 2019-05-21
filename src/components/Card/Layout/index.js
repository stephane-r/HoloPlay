// @flow
import * as React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Title from '../../Title';
import Spacer from '../../Spacer';

type Card = {
  title: string,
  picture: string
};

type Props = {
  customStyle?: Object,
  alignment: string,
  card: Card,
  children?: React.Node
};

const HORIZONTAL_ALIGNMENT = 'horizontal';

const CardLayout = ({ customStyle, alignment, card, children }: Props) => {
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

  return (
    <View style={containerStyles}>
      <TouchableNativeFeedback>
        <View style={[cardStyles, customStyle]}>
          <Image
            resizeMode="cover"
            style={pictureStyles}
            source={{ uri: card.picture }}
          />
          <View style={infosStyles}>
            <Title
              level="3"
              title={card.title} />
            {children && (
              <>
                <Spacer height={10} />
                <View style={styles.footer}>{children}</View>
              </>
            )}
            <Spacer height={5} />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

CardLayout.defaultProps = {
  alignment: 'vertical'
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
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 4,
    transform: [{ translateY: -10 }]
  },
  infos: {
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
