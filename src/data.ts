export interface SongType {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

export type PostionType = Record<string, number>;

const shuffle = (arr: SongType[]) => arr.sort(() => Math.random() - 0.5);

export const listToObject = (arr: SongType[]) => {
  const values = Object.values(arr);
  const object: Record<string, number> = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
};

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
};

export const objectMove = (data: PostionType, from: number, to: number) => {
  "worklet";

  const newObject = Object.assign({}, data);

  for (const id in data) {
    if (data[id] === from) {
      newObject[id] = to;
    }

    if (data[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
};

const ALBUM_COVERS = {
  DISCOVERY:
    "https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg",
  HUMAN_AFTER_ALL:
    "https://upload.wikimedia.org/wikipedia/en/0/0d/Humanafterall.jpg",
  HOMEWORK:
    "https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg",
  RANDOM_ACCESS_MEMORIES:
    "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
};

const DAFT_PUNK = "Daft Punk";

export const SONGS = shuffle([
  {
    id: "one-more-time",
    title: "One More Time",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "digital-love",
    title: "Digital Love",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "nightvision",
    title: "Nightvision",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "something-about-us",
    title: "Something About Us",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "veridis-quo",
    title: "Veridis Quo",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.DISCOVERY,
  },
  {
    id: "make-love",
    title: "Make Love",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: "television-rules-the-nation",
    title: "Television Rules the Nation",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HUMAN_AFTER_ALL,
  },
  {
    id: "phoenix",
    title: "Phoenix",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "revolution-909",
    title: "Revolution 909",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "around-the-world",
    title: "Around the World",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.HOMEWORK,
  },
  {
    id: "within",
    title: "Within",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "touch",
    title: "Touch (feat. Paul Williams)",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "beyond",
    title: "Beyond",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
  {
    id: "motherboard",
    title: "Motherboard",
    artist: DAFT_PUNK,
    cover: ALBUM_COVERS.RANDOM_ACCESS_MEMORIES,
  },
]);

export const SONG_HEIGHT = 70;

export const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT + 20;
