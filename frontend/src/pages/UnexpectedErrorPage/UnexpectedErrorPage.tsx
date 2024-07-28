import { useNavigate } from "react-router-dom";

import { Layout, Result } from "antd";

import Button from "~/components/Button";
import { Routes } from "~/routers";

type Props = Record<string, unknown>;

const UnexpectedErrorPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate(Routes.rooms.entry);
  };

  return (
    <Layout>
      <Layout.Content>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={onClick}>
              TOPに戻る
            </Button>
          }
        />
      </Layout.Content>
    </Layout>
  );
};

export default UnexpectedErrorPage;
