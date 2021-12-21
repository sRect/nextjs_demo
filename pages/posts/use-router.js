import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { List, Divider } from "antd";

export default function UseRouterPage() {
  const router = useRouter();
  const [params, setParams] = useState({});

  useEffect(() => {
    console.log("router", router);
    setParams(router?.query || {});
  }, [router]);

  return (
    <>
      <Head>
        <title>UseRouter</title>
      </Head>
      <List
        header={<div>UseRouter page </div>}
        bordered
        dataSource={Object.keys(params)}
        renderItem={(key) => (
          <List.Item>
            {key}: {params[key]}
          </List.Item>
        )}
      />

      <Divider orientation="left">hash 监听测试</Divider>
      <Link href="#hello">
        <a>点击</a>
      </Link>
    </>
  );
}
