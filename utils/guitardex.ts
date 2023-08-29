import { Guitardex } from "../types";
import { libraries, Library, ModuleLists } from "../types/dynamic/common";

export function createInitialGuitardex(name: string): Guitardex {
  const initObj: Partial<Guitardex> = { name };
  for (const key of libraries as unknown as Library[]) {
    initObj[key] = [];
  }
  return initObj as Guitardex;
}

export function createInitialModuleList(): ModuleLists {
  const initObj: Partial<ModuleLists> = {};
  for (const key of libraries as unknown as Library[]) {
    initObj[key] = [];
  }
  return initObj as ModuleLists;
}

export const libraryReadable = (library: Library): string => {
  switch (library) {
    case "t":
      return "Techniques";
    case "a":
      return "Audio Production";
    default:
      return "Unknown";
  }
};
