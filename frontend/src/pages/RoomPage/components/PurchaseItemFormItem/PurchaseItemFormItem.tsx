import React from "react";

import {
  Col,
  FormInstance,
  FormListFieldData,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import { NamePath } from "antd/es/form/interface";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import Button from "~/components/Button";
import Form from "~/components/Form";
import { RoomForm } from "~/models";

type Props = FormListFieldData & {
  form: FormInstance<RoomForm>;
  remove: (index: number | number[]) => void;
};

const PurchaseItemFormItem: React.FC<Props> = ({
  form,
  name,
  remove,
  ...props
}) => {
  const onIncrementItem = (name: NamePath): void => {
    const item = form.getFieldValue(name);
    form.setFieldValue(name, item + 1);
  };

  const onDecrementItem = (name: NamePath): void => {
    const item = form.getFieldValue(name);
    form.setFieldValue(name, item - 1);
  };

  return (
    <React.Fragment>
      <Row gutter={8} align="middle" css={{ margin: 16 }}>
        <Col flex="auto">
          <Form.Item
            {...props}
            name={[name, "name"]}
            rules={[
              { required: true, message: "商品名は必ず入力してください" },
            ]}
            noStyle>
            <Input placeholder="商品名" />
          </Form.Item>
        </Col>
        <Col>
          <Button
            danger
            icon={<MinusOutlined />}
            onClick={() => onDecrementItem(["items", name, "amount"])}
          />
        </Col>
        <Col
          span={1}
          css={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const amount = getFieldValue(["items", name, "amount"]);
              return (
                <Typography.Text css={{ fontSize: 18 }}>
                  {amount ? amount : 0}
                </Typography.Text>
              );
            }}
          </Form.Item>
        </Col>
        <Col>
          <Button
            icon={<PlusOutlined />}
            onClick={() => onIncrementItem(["items", name, "amount"])}
          />
        </Col>
        <Col>
          <Button
            danger
            type="text"
            onClick={() => remove(name)}
            icon={<DeleteOutlined />}
          />
        </Col>
      </Row>
      <Form.Item {...props} hidden name={[name, "amount"]} noStyle>
        <InputNumber />
      </Form.Item>
    </React.Fragment>
  );
};

export default PurchaseItemFormItem;
