import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  Category,
  Continuation,
  Library,
  Module,
  ModuleFrontMatter,
  PreReq,
  PreReqExpanded,
} from "../types/dynamic/common";
import { GlossaryItem } from "../types";
import { getCodeBlocksFromMarkdown } from "../utils/markdownUtils";

const directory = {
  t: path.join(process.cwd(), "dynamic/techniques"),
  a: path.join(process.cwd(), "dynamic/audioProduction2"),
};

export function mapIdToFilename(shortId: string, library: Library): string {
  const fileNames = fs.readdirSync(directory[library]);
  for (const fileName of fileNames) {
    if (fileName.startsWith(shortId + "-")) {
      return fileName.replace(/\.md$/, "");
    }
  }
  return "";
}

export const filterAndSort = (moduleList: ModuleFrontMatter[], category: Category) =>
  moduleList
    .filter((moduleItem: Module) => moduleItem.category === category)
    .sort((a: Module, b: Module) => (a.name > b.name ? 1 : -1));

export function getAllIds(library: Library) {
  const fileNames = fs.readdirSync(directory[library]);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/-(.*)/, "");
    return {
      params: {
        id,
      },
    };
  });
}

export async function getModuleData(id: string, library: Library) {
  const mappedId = mapIdToFilename(id, library);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id + " in Library: " + library);
  }
  const fullPath = path.join(directory[library], `${mappedId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    id,
    contentMarkdown: matterResult.content,
    ...matterResult.data,
  };
}

export function getAllFrontMatter(library: Library) {
  const fileNames = fs.readdirSync(directory[library]);
  const allFrontMatters = fileNames.map((fileName) => {
    const fullPath = path.join(directory[library], fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data;
  });
  return allFrontMatters;
}

export async function getContinuations(id: string, library: Library) {
  const allFrontMatters: ModuleFrontMatter[] = getAllFrontMatter(library) as ModuleFrontMatter[];
  const allPreReqs: PreReqExpanded[] = allFrontMatters.map((frontmatter: ModuleFrontMatter) => ({
    name: frontmatter.name,
    id: frontmatter.id,
    requirements: frontmatter.requirements,
  }));
  const mappedId = mapIdToFilename(id, library);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id + " in Library: " + library);
  }
  const fullPath = path.join(directory[library], `${mappedId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const moduleItem = data as Module;
  const continuations: Continuation[] = [];
  for (const preReqExpanded of allPreReqs) {
    const requirementIds: number[] = preReqExpanded.requirements.map(
      (requirement: PreReq) => requirement.id
    );
    const indexOfMatchingReq: number = requirementIds.indexOf(moduleItem.id);
    if (indexOfMatchingReq >= 0) {
      const alsoRequires = [...preReqExpanded.requirements];
      alsoRequires.splice(indexOfMatchingReq, 1);
      continuations.push({
        name: preReqExpanded.name,
        id: preReqExpanded.id,
        alsoRequires,
      });
    }
  }
  return continuations;
}

export async function getGlossaryItems(markdown: string): Promise<GlossaryItem[]> {
  const codeItems = getCodeBlocksFromMarkdown(markdown);
  // the Set assures there are no duplicates
  const result: (GlossaryItem | undefined)[] = Array.from(new Set(codeItems))
    ?.map((item) => {
      if (item.includes("|")) {
        const [t, d] = item.split("|");
        const term = t.trim();
        const definition = d.trim();

        return {
          term,
          definition,
        };
      }
      return undefined;
    })
    .sort((a: GlossaryItem, b: GlossaryItem) => (a.term > b.term ? 1 : -1));
  const resultSortedNoUndefined = result.filter((x): x is GlossaryItem => x !== undefined);
  return resultSortedNoUndefined;
}
