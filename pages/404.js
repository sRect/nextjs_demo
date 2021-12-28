import Link from "next/link";
import { Result, Button } from "antd";

export default function Custom404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link href="/">
          <a>
            <Button type="link">Back Home!</Button>
          </a>
        </Link>
      }
    />
  );
}
