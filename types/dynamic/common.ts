export type PreReq = {
  name: string;
  id: number;
};

export type PreReqExpanded = {
  name: string;
  id: number;
  requirements: PreReq[];
};

export type Continuation = PreReq & {
  alsoRequires: PreReq[];
};

export type Difficulty = "easy" | "med" | "hard";

export type CategoryaudioProduction = "general" | "recording" | "mixing" | "mastering";
export type CategoryTechnique = "basics" | "percussion" | "harmonics" | "utility" | "articulation";
export type Category = CategoryaudioProduction | CategoryTechnique;

export type Library = "t" | "a";
