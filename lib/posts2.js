import fs from "fs";
import path from "path";
import matter from "gray-matter";

const mockdataRoot = path.join(process.cwd(), "mockdata");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(mockdataRoot);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(mockdataRoot, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
