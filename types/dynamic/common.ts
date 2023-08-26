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

export type ModuleContinuation = {
  module: PreReq; // Current module
  continuations: Continuation[];
};

export type Difficulty = "easy" | "med" | "hard";

export type CategoryAudioSkill = "general" | "recording" | "mixing" | "mastering";
export type CategoryTechnique = "basics" | "percussion" | "harmonics" | "utility" | "articulation";
export type Category = CategoryAudioSkill | CategoryTechnique;

export type Module = "technique" | "audioSkill";
