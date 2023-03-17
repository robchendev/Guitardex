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
  guitardex?: string;
  difficulty: number;
};

export const tabs: TabInfo[] = [
  {
    title: "Suzume",
    source: "Suzume no Tojimari",
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
    guitardex: "https://gdex.cc/?Suzume_14.5.17.1.2.4.16.6.7.10.11.12.22",
    difficulty: 5,
  },
  {
    title: "Something really long",
    source: "A really long subtitle that overflows to ellipsesspo",
    artist: "RADWIMPS",
    videoLink: "https://www.youtube.com/watch?v=wQANVR4vqXI",
    spotifyLink: "https://open.spotify.com/track/3CqV5uSdPvj5Ux3E8Idusc?si=6365db22464049ef",
    genre: "Alternative",
    tuning: {
      name: "Open D#maj7",
      strings: ["D#", "G", "D", "G", "A#", "D"],
    },
    button: {
      type: "buy",
      price: 7.99,
      link: "https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=MN0268543",
    },
    difficulty: 7,
  },
];
