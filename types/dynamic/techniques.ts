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

export type Technique = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: "basics" | "percussion" | "utility" | "articulation";
  difficulty: "easy" | "med" | "hard";
  demo: string;
  contentHtml: string;
  contentMarkdown: string;
};
