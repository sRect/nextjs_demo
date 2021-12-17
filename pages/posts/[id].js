import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts2";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

// https://www.nextjs.cn/learn/basics/dynamic-routes/page-path-external-data

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();

  console.log("paths==>", paths);
  // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(args) {
  // Fetch necessary data for the blog post using params.id
  console.log("args==>", args);
  /**
   *  {
        params: { id: 'pre-rendering' },
        locales: undefined,
        locale: undefined,
        defaultLocale: undefined
      }
   */
  const { params } = args;
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  const router = useRouter();

  console.log("router==>", router);
  /**
   * ServerRouter {
      route: '/posts/[id]',
      pathname: '/posts/[id]',
      query: { id: 'pre-rendering' },
      asPath: '/posts/pre-rendering',
      isFallback: false,
      basePath: '',
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
      isReady: false,
      domainLocales: undefined,
      isPreview: false,
      isLocaleDomain: false
    }
   */

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
