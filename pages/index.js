import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Space } from "antd";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

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
  const router = useRouter();

  const gotoUseRouter = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/posts/use-router",
      query: {
        a: 1,
        b: [1, 2, 3],
        c: {
          hello: 1,
        },
        d: JSON.stringify({
          hello: 1,
        }),
        e: true,
      },
    });
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/posts/use-router");
    router.prefetch("/posts/uuid");
  }, [router]);

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
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <Space>
          <Link href="/posts/first-post">
            <a>--goto first-post--</a>
          </Link>
          <Button type="link" onClick={gotoUseRouter}>
            goto useRouter
          </Button>
          <Button type="link" onClick={() => router.push("/posts/forbidden")}>
            goto forbidden
          </Button>
          <Button type="link" onClick={() => router.push("/posts/uuid")}>
            uuid
          </Button>
        </Space>
      </footer>
    </Layout>
  );
}
