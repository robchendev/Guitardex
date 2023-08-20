import fs from "fs";
import path from "path";
import matter from "gray-matter";

const techniquesDirectory = path.join(process.cwd(), "dynamic/techniques");

export function getAllTechniqueIds() {
  const fileNames = fs.readdirSync(techniquesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getTechniqueData(id: string) {
  const fullPath = path.join(techniquesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Combine the data with the id
  return {
    id,
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
