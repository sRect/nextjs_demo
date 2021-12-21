import Head from "next/head";
import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
import { useState, Fragment } from "react";
import { Card, Button, Typography, Divider, Spin } from "antd";
import debounce from "lodash/debounce";
// import DynamiComponent from "../../components/dynamiComponent";

// 懒加载
const DynamiComponent = dynamic(
  import(
    /*webpackChunkName dynamiComponent*/ "../../components/dynamiComponent"
  ),
  { loading: () => <Spin /> }
);

async function getUuid() {
  const uuidUrl = "https://httpbin.org/uuid";
  const res = await fetch(uuidUrl);

  return res.json();
}

// 静态生成-获取数据
export async function getStaticProps() {
  const data = await getUuid();

  return {
    props: {
      uuid: data.uuid,
    },
  };
}

export default function Uuid(props) {
  const { uuid } = props;
  const [isShowDynamicCom, setIsShowDynamicCom] = useState(false);

  const [resultUuid, setResultUuid] = useState(() => uuid);

  const handleGetUuid = debounce(async () => {
    const data = await getUuid();
    setResultUuid(data.uuid);
  }, 500);

  const handleShowDynamicComponent = () => {
    setIsShowDynamicCom(true);
  };

  return (
    <>
      <Head>
        <title>uuid</title>
      </Head>
      <Card
        title="远程获取uuid"
        extra={
          <Button type="link" onClick={handleGetUuid}>
            refresh(客户端fetch获取)
          </Button>
        }
      >
        <div>
          uuid:{" "}
          <Typography.Paragraph copyable>{resultUuid}</Typography.Paragraph>
        </div>
      </Card>

      <Divider orientation="left">显示懒加载组件</Divider>
      <Button type="danger" ghost onClick={handleShowDynamicComponent}>
        click
      </Button>
      <div>{isShowDynamicCom ? <DynamiComponent /> : <Fragment />}</div>
    </>
  );
}
