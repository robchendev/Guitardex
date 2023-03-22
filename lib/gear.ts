import fs from "fs";
import path from "path";
import matter from "gray-matter";

const gearDirectory = path.join(process.cwd(), "dynamic/gear");

export function getAllGearIds() {
  const fileNames = fs.readdirSync(gearDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getGearData(id: string) {
  const fullPath = path.join(gearDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
