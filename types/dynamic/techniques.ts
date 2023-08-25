import { Category, Difficulty, PreReq } from "./common";

export type TechniqueFrontMatter = {
  name: string;
  id: number;
  requirements: PreReq[];
  category: Category;
  difficulty: Difficulty;
  demo: string;
};

export type Technique = TechniqueFrontMatter & {
  contentMarkdown: string;
};
