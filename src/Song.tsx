import { FC } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import { SongType, SONG_HEIGHT } from "./data";

export interface SongProps {
  song: SongType;
}

const styles = StyleSheet.create({
  root: {
    height: SONG_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cover: {
    height: 50,
    width: 50,
    borderRadius: 4,
    resizeMode: "cover",
  },
  content: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  artist: {
    fontSize: 12,
    color: "gray",
  },
});

const Song: FC<SongProps> = ({ song }) => (
  <View style={styles.root}>
    <Image style={styles.cover} source={{ uri: song.cover }} />
    <View style={styles.content}>
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
    </View>
  </View>
);

export default Song;
