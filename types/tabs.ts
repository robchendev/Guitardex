export type Buy = {
  type: "buy";
  price: number;
  link: string;
};

export type Free = {
  type: "free"; // Button is "Download or Download icon"
  link: string;
};

export type TuningInfo = {
  name: string;
  strings: string;
};

export type Genre =
  | "Alternative"
  | "Anime"
  | "Anime/Game"
  | "EDM"
  | "Game"
  | "Hip-hop"
  | "Medley"
  | "Pop"
  | "R&B"
  | "Rock"
  | "Film";

export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type TabInfo = {
  title: string;
  source?: string;
  artist?: string;
  genre: Genre; // if genre array includes anime, source becomes "Anime"
  tuning?: TuningInfo;
  videoLink?: string;
  spotifyLink?: string;
  button?: Buy | Free;
  guitardex?: string;
  difficulty: Difficulty;
};
