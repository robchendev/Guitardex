import { Library } from "./dynamic/common";

export type ErrorMessage = {
  message: string;
};

export type GlossaryItem = {
  term: string;
  definition: string;
};

export type Guitardex = {
  name: string;
} & {
  [K in Library]: number[];
};
