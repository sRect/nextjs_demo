import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import {
  remarkExtendedTable,
  extendedTableHandlers,
} from "remark-extended-table";
// import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

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

export async function getPostData(id) {
  const fullPath = path.join(mockdataRoot, `${id}.md`);

  // const fileContents = fs.readFileSync(fullPath, "utf8");
  // const matterResult = matter(fileContents);

  const matterResult = matter.read(fullPath);

  // https://github.com/wataru-chocola/remark-extended-table
  const processedContent = await remark()
    .use(html)
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkExtendedTable)
    .use(remarkRehype, null, {
      handlers: Object.assign({}, extendedTableHandlers),
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
