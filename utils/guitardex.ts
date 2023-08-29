import { Guitardex } from "../types";
import { libraries, Library } from "../types/dynamic/common";

export function createInitialGuitardex(name: string): Guitardex {
  const initObj: Partial<Guitardex> = { name };
  for (const key of libraries as unknown as Library[]) {
    initObj[key] = [];
  }
  return initObj as Guitardex;
}
