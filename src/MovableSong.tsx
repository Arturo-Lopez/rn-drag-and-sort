import { FC, useState } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
  withTiming,
  useAnimatedReaction,
  cancelAnimation,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import Song, { SongProps } from "./Song";
import {
  clamp,
  SONG_HEIGHT,
  SCROLL_HEIGHT_THRESHOLD,
  PostionType,
  objectMove,
} from "./data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

interface MovableSongProps extends SongProps {
  positions: SharedValue<PostionType>;
  scrollY: SharedValue<number>;
  songsCount: number;
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 10,
  },
  animated: {
    maxWidth: "80%",
  },
});

const TIMING_DURATION = 1500;

const MovableSong: FC<MovableSongProps> = ({
  song,
  positions,
  scrollY,
  songsCount,
}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[song.id] * SONG_HEIGHT);
  const dimensions = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);

      if (Platform.OS === "ios") {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Handle scroll up
        scrollY.value = withTiming(0, { duration: TIMING_DURATION });
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        // Handle scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;

        // It's not the total height of the content list, instead is the
        // top position and the end
        const maxScroll = contentHeight - containerHeight;

        scrollY.value = withTiming(maxScroll, {
          duration: TIMING_DURATION,
        });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / SONG_HEIGHT),
        0,
        songsCount - 1
      );

      if (newPosition !== positions.value[song.id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[song.id],
          newPosition
        );

        if (Platform.OS === "ios") {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      top.value = positions.value[song.id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  useAnimatedReaction(
    () => positions.value[song.id],
    (curr, prev) => {
      if (curr !== prev && !moving) {
        top.value = withSpring(curr * SONG_HEIGHT);
      }
    },
    [moving]
  );

  const animatedStyle = useAnimatedStyle(
    () => ({
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowOpacity: withSpring(moving ? 0.2 : 0),
    }),
    [moving]
  );

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <BlurView intensity={moving ? 100 : 0} tint="light">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={styles.animated}>
            <Song song={song} />
          </Animated.View>
        </PanGestureHandler>
      </BlurView>
    </Animated.View>
  );
};

export default MovableSong;
