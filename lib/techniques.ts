import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mapIdToFilename } from "./common";
import { Technique } from "../types/dynamic/techniques";
import { ModuleContinuation, PreReq, PreReqExpanded } from "../types/dynamic/common";

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

export async function getTechniqueData(id: string) {
  const mappedId = mapIdToFilename(id, techniquesDirectory);
  if (!mappedId) {
    throw new Error("Could not find the file for the given ID: " + id);
  }
  const fullPath = path.join(techniquesDirectory, `${mappedId}.md`);
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

export async function getAllTechniqueContinuations(id: string) {
  const fileNames = fs.readdirSync(techniquesDirectory);

  const allFrontMatters: Technique[] = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(techniquesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);

    return data as Technique;
  });

  // Extract pre requisites from allFrontMatters into its own array
  const allPreReqs: PreReqExpanded[] = allFrontMatters.map((frontmatter: Technique) => ({
    name: frontmatter.name,
    id: frontmatter.id,
    requirements: frontmatter.requirements,
  }));

  const allModuleContinuations: ModuleContinuation[] = [];
  for (const preReq of allPreReqs) {
    const moduleContinuation: ModuleContinuation = {
      module: {
        name: preReq.name,
        id: preReq.id,
      },
      continuations: [],
    };
    for (const preReqExpanded of allPreReqs) {
      const requirementIds: number[] = preReqExpanded.requirements.map(
        (requirement: PreReq) => requirement.id
      );
      const indexOfMatchingReq: number = requirementIds.indexOf(preReq.id);
      if (indexOfMatchingReq >= 0) {
        const alsoRequires = [...preReqExpanded.requirements];
        alsoRequires.splice(indexOfMatchingReq, 1);
        moduleContinuation.continuations.push({
          name: preReqExpanded.name,
          id: preReqExpanded.id,
          alsoRequires,
        });
      }
    }
    allModuleContinuations.push(moduleContinuation);
  }

  // Sort module continatuions by module id (for easy index based access)
  allModuleContinuations.sort((a: ModuleContinuation, b: ModuleContinuation) =>
    a.module.id > b.module.id ? 1 : -1
  );

  return allModuleContinuations;
}
