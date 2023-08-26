import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mapIdToFilename } from "./common";

const audioProductionDirectory = path.join(process.cwd(), "dynamic/audioProduction");

export function getAllAudioProductionIds() {
  const fileNames = fs.readdirSync(audioProductionDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/-(.*)/, "");
    return {
      params: {
        id,
      },
    };
  });
}

export async function getAudioProductionData(id: string) {
  const mappedId = mapIdToFilename(id, audioProductionDirectory);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id);
  }
  const fullPath = path.join(audioProductionDirectory, `${mappedId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id content in Markdown format
  return {
    id,
    contentMarkdown: matterResult.content,
    ...matterResult.data,
  };
}

export function getAllAudioProductionFrontMatter() {
  // Get file names under /audioProduction
  const fileNames = fs.readdirSync(audioProductionDirectory);

  const allFrontMatters = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(audioProductionDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);

    return data;
  });
  return allFrontMatters;
}
