import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const techniquesDirectory = path.join(process.cwd(), "dynamic/techniques");

export function getAllTechniqueIds() {
  const fileNames = fs.readdirSync(techniquesDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/-(.*)/, "");
    return {
      params: {
        id,
      },
    };
  });
}

export function mapIdToFilename(shortId: string): string {
  const fileNames = fs.readdirSync(techniquesDirectory);
  for (const fileName of fileNames) {
    if (fileName.startsWith(shortId + "-")) {
      return fileName.replace(/\.md$/, "");
    }
  }
  return "";
}

export async function getTechniqueData(id: string) {
  const mappedId = mapIdToFilename(id);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id);
  }
  const fullPath = path.join(techniquesDirectory, `${mappedId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark().use(html).process(matterResult.content);
  // const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentMarkdown: matterResult.content,
    ...matterResult.data,
  };
}

export function getAllTechniqueFrontMatter() {
  // Get file names under /techniques
  const fileNames = fs.readdirSync(techniquesDirectory);

  const allFrontMatters = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(techniquesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);

    return data;
  });

  return allFrontMatters;
}
