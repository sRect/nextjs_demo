import fs from "fs";
import path from "path";
import matter from "gray-matter";

const mockdataRoot = path.join(process.cwd(), "mockdata");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(mockdataRoot);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(mockdataRoot, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
}
