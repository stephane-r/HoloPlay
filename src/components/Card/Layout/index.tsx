import React from "react";
import { Children } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ActivityIndicator, Subheading, useTheme } from "react-native-paper";

import { DASHBOARD_COLOR } from "../../../../config/theme";
import { CapsuleTotalSongs } from "../../Capsule";
import { ButtonPlayPlaylist } from "../../CapsulePlaylist";
import Label from "../../Label";
import Spacer from "../../Spacer";
import Video from "../../Video";

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
  onPress?: (videoIndex: number) => void;
  index?: number;
  rightContent?: any;
  itemsRenderer?: any;
  showItems?: boolean;
  isLoading?: boolean;
  // TODO: refactoring
  isStream?: boolean;
}

const HORIZONTAL_ALIGNMENT = "horizontal";

const CardLayout: React.FC<CardProps> = ({
  customStyle,
  alignment,
  card,
  children: childrenProp,
  rightContent,
  itemsRenderer,
  showItems,
  isLoading,
  containerCustomStyle = {},
  pictureCustomStyle = {},
  ...props
}) => {
  const { colors } = useTheme();

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

  const children = Children.toArray(childrenProp);
  const video = children.find((child) => child.type === Video);
  const buttonPlay = children.find(
    (child) => child.type === ButtonPlayPlaylist
  );
  const totalSongs = children.find((child) => child.type === CapsuleTotalSongs);

  return (
    <View style={[containerStyles, containerCustomStyle]}>
      <View
        style={[
          cardStyles,
          {
            backgroundColor: colors.surface,
          },
          customStyle,
        ]}
      >
        <TouchableNativeFeedback
          onPress={() => props.onPress && props.onPress(props.index)}
        >
          <View
            style={{
              width: "100%",
              flexDirection: isHorizontal ? "row" : "column",
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                resizeMode="cover"
                style={[pictureStyles, pictureCustomStyle]}
                source={{ uri: card.picture }}
              />
              {!isHorizontal && (
                <>
                  {card.liveNow ? (
                    <Label align="right" theme={DASHBOARD_COLOR}>
                      LIVE
                    </Label>
                  ) : card.duration ? (
                    <Label align="left" theme="#0455BF">
                      {card.duration}
                    </Label>
                  ) : null}
                </>
              )}
            </View>
            <View style={infosStyles}>
              <View style={{ flex: 1 }}>
                <Subheading
                  style={titleStyles}
                  numberOfLines={isHorizontal ? 1 : 2}
                >
                  {card.title}
                </Subheading>
                {totalSongs && (
                  <>
                    {isHorizontal && <Spacer height={5} />}
                    <View style={styles.footer}>{totalSongs}</View>
                  </>
                )}
              </View>
              {buttonPlay}
            </View>
            {isLoading && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  width: "100%",
                  height: isHorizontal ? "100%" : "120%",
                  top: isHorizontal ? 0 : -25,
                  backgroundColor: "rgba(255, 255, 255, .6)",
                }}
              >
                <ActivityIndicator />
              </View>
            )}
          </View>
        </TouchableNativeFeedback>
        {video}
      </View>
    </View>
  );
};

CardLayout.defaultProps = {
  alignment: "vertical",
  itemsRenderer: null,
  isStream: false,
};

const stylesVertical = StyleSheet.create({
  container: {
    width: "50%",
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  card: {
    elevation: 2,
    flex: 1,
    borderRadius: 4,
    padding: 10,
  },
  title: {
    height: 55,
  },
  infos: {
    marginTop: -5,
  },
  picture: {
    width: "100%",
    height: 100,
    borderRadius: 4,
    transform: [{ translateY: -25 }],
    marginBottom: -10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const stylesHorizontal = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  card: {
    elevation: 4,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 20,
  },
  title: {},
  picture: {
    width: 80,
    height: 80,
    borderRadius: 4,
    transform: [{ translateY: -10 }],
  },
  infos: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { stylesVertical, stylesHorizontal };
export default CardLayout;
