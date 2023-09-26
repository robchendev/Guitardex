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
import { audioProductionOrder } from "../config/audioProductionOrder";

const directory = {
  blog: path.join(process.cwd(), "dynamic/blogPosts"),
};

export function mapDateToFilename(shortId: string, library: Library): string {
  const fileNames = fs.readdirSync(directory[library]);
  for (const fileName of fileNames) {
    if (fileName.startsWith(shortId + "-")) {
      return fileName.replace(/\.md$/, "");
    }
  }
  return "";
}

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
  const mappedId = mapDateToFilename(id, library);
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
