import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { message } from "antd";

export default function Forbidden() {
  const router = useRouter();

  useEffect(() => {
    // 测试beforePopState
    router.beforePopState(({ url, as, options }) => {
      if (as === "/") {
        message.destroy();
        message.warning("路由拦截");
        return false;
      }

      return true;
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title>Forbidden Page</title>
      </Head>
      Forbidden Page
    </div>
  );
}
