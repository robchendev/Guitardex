export type Buy = {
  type: "buy";
  price: number;
  link: string;
};

export type Free = {
  type: "free"; // Button is "Download or Download icon"
  link: string;
};

export type Note = "A" | "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";
export type TuningInfo = {
  name: string;
  strings: [Note, Note, Note, Note, Note, Note];
};

export type Genre =
  | "Alternative"
  | "Anime"
  | "EDM"
  | "Game"
  | "Hip-hop"
  | "Pop"
  | "R&B"
  | "Rock"
  | "TV/Movie";

export type TabInfo = {
  title: string;
  source?: string;
  artist?: string;
  genre: Genre; // if genre array includes anime, source becomes "Anime"
  tuning: TuningInfo;
  videoLink?: string;
  spotifyLink?: string;
  button?: Buy | Free;
};

export const tabs: TabInfo[] = [
  {
    title: "Suzume",
    source: "Suzume no Tojimari OST",
    artist: "RADWIMPS",
    videoLink: "https://youtu.be/wQANVR4vqXI",
    genre: "Anime",
    tuning: {
      name: "Open D#maj7",
      strings: ["D#", "G", "D", "G", "A#", "D"],
    },
    button: {
      type: "buy",
      price: 7.99,
      link: "https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0268543",
    },
  },
  {
    title: "Suzume",
    source: "Suzume no Tojimari OST",
    artist: "RADWIMPS",
    videoLink: "https://youtu.be/wQANVR4vqXI",
    spotifyLink: "https://youtu.be/wQANVR4vqXI",
    genre: "Anime",
    tuning: {
      name: "Open D#maj7",
      strings: ["D#", "G", "D", "G", "A#", "D"],
    },
    button: {
      type: "buy",
      price: 7.99,
      link: "https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0268543",
    },
  },
];
