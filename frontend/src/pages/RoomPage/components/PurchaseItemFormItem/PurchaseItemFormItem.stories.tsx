import { useEffect } from "react";

import { Card } from "antd";
import { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import Form from "~/components/Form";
import { RoomForm } from "~/models";

import PurchaseItemFormItem from "./PurchaseItemFormItem";

const meta: Meta<typeof PurchaseItemFormItem> = {
  component: PurchaseItemFormItem,
  render: () => {
    const [form] = Form.useForm<RoomForm>();

    useEffect(() => {
      form.setFieldValue("items", [
        {
          id: uuidv4(),
          name: "Bacchus",
          amount: 2,
        },
        {
          id: uuidv4(),
          name: "じゃがりこ",
          amount: 1,
        },
        {
          id: uuidv4(),
          name: "モンスター",
          amount: 6,
        },
      ]);
    }, []);

    return (
      <Form form={form}>
        <Card css={{ width: "100%", height: "auto" }}>
          <Form.List name="items">
            {(fields, { remove }) => (
              <>
                {fields.map(({ key, ...restField }) => (
                  <PurchaseItemFormItem
                    key={key}
                    form={form}
                    {...restField}
                    remove={remove}
                  />
                ))}
              </>
            )}
          </Form.List>
        </Card>
      </Form>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
