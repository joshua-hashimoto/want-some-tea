import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Input, Spin } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import Button from "~/components/Button";
import Card from "~/components/Card";
import Form from "~/components/Form";
import Page from "~/components/Page";
import { useFetchRoomDetail } from "~/hooks";
import { RoomForm } from "~/models";

import DeleteRoomPopup from "./components/DeleteRoomPopup";
import PurchaseItemFormItem from "./components/PurchaseItemFormItem";

type RoomPageProps = Record<string, unknown>;

const RoomPage: React.FC<RoomPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<RoomForm>();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { data, isLoading } = useFetchRoomDetail(id);

  const onDelete = (): void => {};

  const onDeleteModalOpen = (): void => {
    setIsDeletePopupOpen(true);
  };

  const onDeleteModalClose = (): void => {
    setIsDeletePopupOpen(false);
  };

  const renderDeleteButton = (): React.ReactNode => {
    return (
      <Button
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        onClick={onDeleteModalOpen}
        data-testid="room-delete-button"
      />
    );
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <Page>
        <Form form={form}>
          <Form.Item name="id" hidden noStyle>
            <Input data-testid="room-id" />
          </Form.Item>
          <Card
            title={
              <Form.Item name="title" css={{ margin: 0 }}>
                <Input data-testid="title" />
              </Form.Item>
            }
            extra={renderDeleteButton()}
            css={{ width: "100%", maxWidth: 800, height: "auto" }}>
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, ...restField }) => (
                    <PurchaseItemFormItem
                      key={key}
                      form={form}
                      {...restField}
                      remove={remove}
                    />
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}>
                      追加
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>
        </Form>
        <DeleteRoomPopup
          open={isDeletePopupOpen}
          onDelete={onDelete}
          onCancel={onDeleteModalClose}
        />
      </Page>
    </Spin>
  );
};

export default RoomPage;
