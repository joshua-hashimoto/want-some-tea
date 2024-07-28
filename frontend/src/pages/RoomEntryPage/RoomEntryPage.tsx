import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Input, Row, Typography } from "antd";
import { useDebounce } from "use-debounce";

import Card from "~/components/Card";
import Page from "~/components/Page";
import { Routes } from "~/routers";

type RoomEntryPageProps = Record<string, unknown>;

const RoomEntryPage: React.FC<RoomEntryPageProps> = () => {
  const [roomId, setRoomId] = useState("");
  const [value] = useDebounce(roomId, 1000);
  const navigate = useNavigate();

  const onRoomIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setRoomId(inputValue);
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    const url = Routes.rooms.detail.replace(":id", value);
    navigate(url);
  }, [value]);

  return (
    <Page>
      <Card title="部屋IDを入力" css={{ width: "100%", maxWidth: 500 }}>
        <Col span={24}>
          <Row>
            <Typography.Text>
              入りたい部屋のIDを入力してください。
            </Typography.Text>
          </Row>
          <Row>
            <Input value={roomId} onChange={onRoomIdChange} />
          </Row>
          <Row css={{ marginTop: 10 }}>
            <Typography.Text>
              入力が完了すると、自動で遷移します。
            </Typography.Text>
          </Row>
        </Col>
      </Card>
    </Page>
  );
};

export default RoomEntryPage;
