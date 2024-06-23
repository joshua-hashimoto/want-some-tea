import { useNavigate } from "react-router-dom";

import { Col, Form, Input, Row } from "antd";

import Button from "~/components/Button";
import Card from "~/components/Card";
import Page from "~/components/Page";
import { useSignInMutation } from "~/hooks";
import { SignInForm } from "~/models";
import { Routes } from "~/routers";

type SignInPageProps = Record<string, unknown>;

const SignInPage: React.FC<SignInPageProps> = () => {
  const [form] = Form.useForm<SignInForm>();
  const navigate = useNavigate();
  const { mutate: signIn } = useSignInMutation();

  const onFinish = (values: SignInForm): void => {
    signIn(values, {
      onSuccess: () => {
        navigate(Routes.rooms.entry);
      },
    });
  };

  return (
    <Page>
      <Col span={24}>
        <Row justify="center">
          <Card title="ログイン">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="メールアドレス"
                name="email"
                required
                rules={[{ type: "email" }]}>
                <Input type="email" data-testid="email-input" />
              </Form.Item>
              <Form.Item label="パスワード" name="password" required>
                <Input.Password data-testid="password-input" />
              </Form.Item>
              <Form.Item shouldUpdate noStyle>
                {({ getFieldValue }) => {
                  const emailValue = getFieldValue("email");
                  const passwordValue = getFieldValue("password");
                  const isDisabled = !emailValue || !passwordValue;
                  return (
                    <Col span={24}>
                      <Row justify="end">
                        <Button
                          htmlType="submit"
                          disabled={isDisabled}
                          type="primary">
                          ログインする
                        </Button>
                      </Row>
                    </Col>
                  );
                }}
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </Col>
    </Page>
  );
};

export default SignInPage;
