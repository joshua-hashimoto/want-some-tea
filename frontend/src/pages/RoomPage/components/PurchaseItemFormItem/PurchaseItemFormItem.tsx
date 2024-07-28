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
      <Row
        gutter={8}
        align="middle"
        css={{ margin: 16 }}
        data-testid="purchase-item-form-item">
        <Col flex="auto">
          <Form.Item
            {...props}
            name={[name, "name"]}
            rules={[
              { required: true, message: "商品名は必ず入力してください" },
            ]}>
            <Input placeholder="商品名" data-testid="name-input" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              danger
              icon={<MinusOutlined />}
              onClick={() => onDecrementItem(["items", name, "amount"])}
              data-testid="minus-button"
            />
          </Form.Item>
        </Col>
        <Col
          span={1}
          css={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const amount = getFieldValue(["items", name, "amount"]);
              return (
                <Typography.Text
                  css={{ fontSize: 18 }}
                  data-testid="item-amount">
                  {amount ? amount : 0}
                </Typography.Text>
              );
            }}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              icon={<PlusOutlined />}
              onClick={() => onIncrementItem(["items", name, "amount"])}
              data-testid="plus-button"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              danger
              type="text"
              onClick={() => remove(name)}
              icon={<DeleteOutlined />}
              data-testid="delete-button"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...props} hidden name={[name, "amount"]} noStyle>
        <InputNumber data-testid="hidden-amount" />
      </Form.Item>
    </React.Fragment>
  );
};

export default PurchaseItemFormItem;
