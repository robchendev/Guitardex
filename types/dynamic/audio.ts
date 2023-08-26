import { Category, Difficulty, PreReq } from "./common";

export type AudioProductionFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: Category;
  difficulty: Difficulty;
  demo: string;
};

export type AudioProduction = AudioProductionFrontMatter & {
  contentMarkdown: string;
};
