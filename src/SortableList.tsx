import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { listToObject, SONGS, SONG_HEIGHT } from "./data";
import MovableSong from "./MovableSong";

const SortableList = () => {
  const positions = useSharedValue(listToObject(SONGS));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useAnimatedReaction(
    () => scrollY.value,
    (curr) => scrollTo(scrollViewRef, 0, curr, false)
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        height: SONGS.length * SONG_HEIGHT,
      }}
    >
      {SONGS.map((song) => (
        <MovableSong
          key={song.id}
          song={song}
          positions={positions}
          scrollY={scrollY}
          songsCount={SONGS.length}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default SortableList;
