import { Col, Modal, ModalProps, Row } from "antd";

import Button from "~/components/Button";

type Props = ModalProps & {
  onDelete: () => void;
};

const DeleteRoomPopup: React.FC<Props> = ({ onDelete, ...props }) => (
  <Modal
    {...props}
    title="本当に削除しますか？"
    centered
    footer={
      <Col span={24}>
        <Row justify="center">
          <Button danger onClick={onDelete} css={{ width: "100%" }}>
            削除
          </Button>
        </Row>
      </Col>
    }
    width={300}
  />
);

export default DeleteRoomPopup;
