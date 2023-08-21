export type GearLink = {
  seller: string;
  link: string;
};

export type Gear = {
  name: string;
  links?: GearLink[];
};

export type Section = {
  name: string;
  gear?: Gear[];
};

export type GearItem = {
  name: string;
  id: string;
  sections?: Section[];
};

export type PreReq = {
  name: string;
  id: number;
};

export type Difficulty = "easy" | "med" | "hard";

export type TechniqueFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: "basics" | "percussion" | "utility" | "articulation";
  difficulty: Difficulty;
  demo: string;
};

export type Technique = TechniqueFrontMatter & {
  contentMarkdown: string;
};
