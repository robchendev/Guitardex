import fs from "fs";
import path from "path";
import matter from "gray-matter";

const linkDirectory = path.join(process.cwd(), "dynamic/link");

export function getAllLinkIds() {
  const fileNames = fs.readdirSync(linkDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getLinkData(id: string) {
  const fullPath = path.join(linkDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
