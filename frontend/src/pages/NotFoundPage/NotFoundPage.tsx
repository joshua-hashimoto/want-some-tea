import { useNavigate } from "react-router-dom";

import { Layout, Result, ResultProps } from "antd";

import Button from "~/components/Button";
import { Routes } from "~/routers";

type NotFoundPageProps = Omit<
  Omit<Omit<Omit<ResultProps, "status">, "title">, "subTitle">,
  "extra"
>;

const NotFoundPage: React.FC<NotFoundPageProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate(Routes.rooms.entry);
  };

  return (
    <Layout>
      <Layout.Content>
        <Result
          {...props}
          status="404"
          title="見つかりませんでした"
          subTitle="ページは存在しないようです"
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

export default NotFoundPage;
