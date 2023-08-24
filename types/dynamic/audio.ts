import { Difficulty, PreReq } from "./common";

export type AudioSkillFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: "general" | "recording" | "mixing" | "mastering";
  difficulty: Difficulty;
  demo: string;
};

export type AudioSkill = AudioSkillFrontMatter & {
  contentMarkdown: string;
};
