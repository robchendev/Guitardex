export type PreReq = {
  name: string;
  id: number;
};

export type Difficulty = "easy" | "med" | "hard";

export type CategoryAudioSkill = "general" | "recording" | "mixing" | "mastering";
export type CategoryTechnique = "basics" | "percussion" | "harmonics" | "utility" | "articulation";
export type Category = CategoryAudioSkill | CategoryTechnique;

export type Module = "technique" | "audioSkill";
