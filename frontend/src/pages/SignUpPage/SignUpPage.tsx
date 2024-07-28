import { useNavigate } from "react-router-dom";

import { Col, Input, Row } from "antd";

import Button from "~/components/Button";
import Card from "~/components/Card";
import Form from "~/components/Form";
import Page from "~/components/Page";
import { useSignUpMutation } from "~/hooks";
import { SignUpForm } from "~/models";
import { Routes } from "~/routers";

type SignUpPageProps = Record<string, unknown>;

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [form] = Form.useForm<SignUpForm>();
  const navigate = useNavigate();
  const { mutate: signUp } = useSignUpMutation();

  const onFinish = (values: SignUpForm): void => {
    signUp(values, {
      onSuccess: () => {
        navigate(Routes.auth.signIn);
      },
    });
  };

  return (
    <Page>
      <Col span={24}>
        <Row justify="center">
          <Card title="アカウント登録">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Col span={24}>
                <Form.Item
                  label="メールアドレス"
                  name="email"
                  required
                  rules={[{ type: "email" }]}>
                  <Input type="email" data-testid="email-input" />
                </Form.Item>
                <Form.Item label="ニックネーム" name="nickname" required>
                  <Input data-testid="nickname-input" />
                </Form.Item>
                <Form.Item label="パスワード" name="password" required>
                  <Input.Password data-testid="password-input" />
                </Form.Item>
                <Form.Item
                  label="パスワード確認"
                  name="confirmPassword"
                  required>
                  <Input.Password data-testid="confirm-password-input" />
                </Form.Item>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    const emailValue = getFieldValue("email");
                    const nicknameValue = getFieldValue("nickname");
                    const passwordValue = getFieldValue("password");
                    const confirmPasswordValue =
                      getFieldValue("confirmPassword");
                    const isDisabled =
                      !emailValue ||
                      !nicknameValue ||
                      !passwordValue ||
                      !confirmPasswordValue;
                    return (
                      <Col span={24}>
                        <Row justify="end">
                          <Button
                            htmlType="submit"
                            disabled={isDisabled}
                            type="primary">
                            アカウントを登録する
                          </Button>
                        </Row>
                      </Col>
                    );
                  }}
                </Form.Item>
              </Col>
            </Form>
          </Card>
        </Row>
      </Col>
    </Page>
  );
};

export default SignUpPage;
