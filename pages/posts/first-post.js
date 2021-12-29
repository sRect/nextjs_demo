import Link from "next/link";
import Head from "next/head";
// import styled from "styled-components";
import Layout from "../../components/layout";

// const Title = styled.h1`
//   font-size: 20px;
//   color: ${({ theme }) => theme.color};
// `;

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <div>
        <h1 className="globalTest">First Post</h1>
        {/* <Title theme={{ color: "red" }}>style components</Title> */}
        <div className="text-3xl font-bold underline">tailwind css</div>
        <h2>
          <Link href="/">
            <a> Back to home!!! </a>
          </Link>
        </h2>
        <style jsx>{`
          h2 {
            color: blue;
          }
          h2:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </Layout>
  );
}
