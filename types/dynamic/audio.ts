import { Category, Difficulty, PreReq } from "./common";

export type AudioSkillFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: Category;
  difficulty: Difficulty;
  demo: string;
};

export type AudioSkill = AudioSkillFrontMatter & {
  contentMarkdown: string;
};
