import fs from "fs";

export function mapIdToFilename(shortId: string, directory: string): string {
  const fileNames = fs.readdirSync(directory);
  for (const fileName of fileNames) {
    if (fileName.startsWith(shortId + "-")) {
      return fileName.replace(/\.md$/, "");
    }
  }
  return "";
}
