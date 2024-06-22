import { Button, Card, Col, Input, Row } from "antd";

import Form from "~/components/Form";
import Page from "~/components/Page";
import { useCreateRoom } from "~/hooks";
import { RoomCreateForm } from "~/models";

type RoomCreatePageProps = Record<string, unknown>;

const RoomCreatePage: React.FC<RoomCreatePageProps> = () => {
  const [form] = Form.useForm<RoomCreateForm>();
  const { mutate: createRoom } = useCreateRoom();

  const onFinish = (values: RoomCreateForm): void => {
    createRoom(values);
  };

  return (
    <Page>
      <Col span={10}>
        <Card title="おつかいを作成" css={{ width: "100%", maxWidth: 500 }}>
          <Row>
            <Col span={24}>
              <Form form={form} onFinish={onFinish}>
                <Col span={24}>
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
                </Col>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Page>
  );
};

export default RoomCreatePage;
