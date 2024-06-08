import { Button, Card, Col, Form, Input, Layout, Row } from "antd";

import { useCreateRoom } from "~/hooks/useRoomsApi";
import { RoomCreateForm } from "~/models";

type RoomCreatePageProps = Record<string, unknown>;

const RoomCreatePage: React.FC<RoomCreatePageProps> = () => {
  const [form] = Form.useForm<RoomCreateForm>();
  const { mutate: createRoom } = useCreateRoom();

  const onFinish = (values: RoomCreateForm): void => {
    createRoom(values);
  };

  return (
    <Layout css={{ height: "100vh" }}>
      <Layout.Content css={{ height: "100%" }}>
        <Col span={24} css={{ height: "100%" }}>
          <Row align="middle" justify="center" css={{ height: "100%" }}>
            <Col span={10}>
              <Card
                title="おつかいを作成"
                css={{ width: "100%", maxWidth: 500 }}>
                <Row>
                  <Col span={24}>
                    <Form form={form} onFinish={onFinish}>
                      <Row>
                        <Col span={24}>
                          <Form.Item name="name">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item noStyle>
                            <Row justify="end">
                              <Col>
                                <Form.Item shouldUpdate>
                                  {({ getFieldValue }) => {
                                    const roomName = getFieldValue("name");
                                    return (
                                      <Button
                                        htmlType="submit"
                                        disabled={!roomName}>
                                        作成する
                                      </Button>
                                    );
                                  }}
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Layout.Content>
    </Layout>
  );
};

export default RoomCreatePage;
