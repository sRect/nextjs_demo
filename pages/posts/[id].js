import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { getAllPostIds, getPostData } from "../../lib/posts2";

export async function getStaticPaths() {
  console.log("getStaticPaths===>");
  const paths = getAllPostIds();

  console.log("paths==>", paths);
  // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(args) {
  console.log("getStaticProps===>");
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
  const postData = getPostData(params.id);
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
      title: {postData.title}
      <br />
      id: {postData.id}
      <br />
      date: {postData.date}
    </Layout>
  );
}
