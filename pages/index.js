import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

// 静态生成-获取数据
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  console.log("allPostsData==>", allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>磨刀不误砍柴Giao</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, subTitle }) => (
            <li className={utilStyles.listItem} key={id}>
              title: {title}
              <br />
              subTitle: {subTitle}
              <br />
              id: {id}
              <br />
              date: {date}
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <Link href="/posts/first-post">
          <a>--goto first-post--</a>
        </Link>
      </footer>
    </Layout>
  );
}
