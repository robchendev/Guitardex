export type PreReq = {
  name: string;
  id: number;
  category?: string;
};

export type PreReqExpanded = PreReq & {
  requirements: PreReq[];
};

export type Continuation = PreReq & {
  alsoRequires: PreReq[];
};

export type Difficulty = "easy" | "med" | "hard";

export type CategoryaudioProduction =
  | "general"
  | "concepts"
  | "recording"
  | "mixing"
  | "mastering"
  | "demo";
export type CategoryTechnique = "basics" | "percussion" | "harmonics" | "utility" | "articulation";
export type Category = CategoryaudioProduction | CategoryTechnique;

export const libraries = ["t", "a"] as const;
export type Library = (typeof libraries)[number];

export const slugs = ["blogs"] as const;
export type Slugs = (typeof slugs)[number];

type CombineTuples<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
export type AllSlugs = CombineTuples<typeof libraries, typeof slugs>[number];

export type ModuleFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: Category;
  difficulty?: Difficulty;
  demo?: string;
};

export type Module = ModuleFrontMatter & {
  contentMarkdown: string;
};

export type ModuleLists = { [K in Library]: ModuleFrontMatter[] };
