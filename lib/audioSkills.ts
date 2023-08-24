import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mapIdToFilename } from "./common";

const audioSkillsDirectory = path.join(process.cwd(), "dynamic/audioSkills");

export function getAllAudioSkillIds() {
  const fileNames = fs.readdirSync(audioSkillsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/-(.*)/, "");
    return {
      params: {
        id,
      },
    };
  });
}

export async function getAudioSkillData(id: string) {
  const mappedId = mapIdToFilename(id, audioSkillsDirectory);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id);
  }
  const fullPath = path.join(audioSkillsDirectory, `${mappedId}.md`);
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

export function getAllAudioSkillsFrontMatter() {
  // Get file names under /audioSkills
  const fileNames = fs.readdirSync(audioSkillsDirectory);

  const allFrontMatters = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(audioSkillsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);

    return data;
  });
  return allFrontMatters;
}
