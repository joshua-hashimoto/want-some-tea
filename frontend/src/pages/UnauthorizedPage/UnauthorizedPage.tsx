import { useNavigate } from "react-router-dom";

import { Button, Layout, Result, ResultProps } from "antd";

import { Routes } from "~/routers";

type UnauthorizedPageProps = Omit<
  Omit<Omit<Omit<ResultProps, "status">, "title">, "subTitle">,
  "extra"
>;

const UnauthorizedPage: React.FC<UnauthorizedPageProps> = ({ ...props }) => {
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate(Routes.auth.signIn);
  };

  return (
    <Layout>
      <Layout.Content>
        <Result
          {...props}
          status="403"
          title="認証されていません"
          subTitle="ログインしてください"
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

export default UnauthorizedPage;
