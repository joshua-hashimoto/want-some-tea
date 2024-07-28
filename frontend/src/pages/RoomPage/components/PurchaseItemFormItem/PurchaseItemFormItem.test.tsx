import { Card, Form } from "antd";
import { useEffect } from "react";
import { PurchaseItem, RoomForm } from "~/models";
import { v4 as uuidv4 } from "uuid";
import PurchaseItemFormItem from "./PurchaseItemFormItem";
import { renderComponent } from "~/utils/tests";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const formData: PurchaseItem[] = [
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
];

const Wrapper: React.FC<{ data: PurchaseItem[] }> = ({ data }) => {
  const [form] = Form.useForm<RoomForm>();

  useEffect(() => {
    form.setFieldValue("items", data);
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
};

test("display test", () => {
  renderComponent(<Wrapper data={formData} />);

  const formItems = screen.getAllByTestId(/purchase-item-form-item/);
  expect(formItems.length).toBe(formData.length);

  const nameInputs = screen.getAllByTestId(/name-input/);
  expect(nameInputs.length).toBe(formData.length);

  const minusButtons = screen.getAllByTestId(/minus-button/);
  expect(minusButtons.length).toBe(formData.length);

  const itemAmounts = screen.getAllByTestId(/item-amount/);
  expect(itemAmounts.length).toBe(formData.length);

  const plusButtons = screen.getAllByTestId(/plus-button/);
  expect(plusButtons.length).toBe(formData.length);

  const deleteButtons = screen.getAllByTestId(/delete-button/);
  expect(deleteButtons.length).toBe(formData.length);

  const hiddenAmounts = screen.getAllByTestId(/hidden-amount/);
  expect(hiddenAmounts.length).toBe(formData.length);
});

test("amount actions test", async () => {
  // NOTE: アイテム数を1つに制限
  renderComponent(<Wrapper data={[formData[0]]} />);

  const itemAmount = screen.getByTestId(/item-amount/) as HTMLSpanElement;
  expect(itemAmount.innerHTML).toBe("2");

  const minusButton = screen.getByTestId(/minus-button/);
  await userEvent.click(minusButton);

  expect(screen.getByTestId(/item-amount/).innerHTML).toBe("1");

  const plusButton = screen.getByTestId(/plus-button/);
  await userEvent.click(plusButton);
  await userEvent.click(plusButton);

  expect(screen.getByTestId(/item-amount/).innerHTML).toBe("3");
});

test("input validation test", async () => {
  // NOTE: アイテム数を1つに制限
  renderComponent(<Wrapper data={[formData[0]]} />);

  const nameInput = screen.getByTestId(/name-input/) as HTMLInputElement;

  expect(nameInput.value).toBe(formData[0].name);

  await userEvent.clear(nameInput);

  const helpText = screen.getByText(/商品名は必ず入力してください/);
  expect(helpText).toBeInTheDocument();
});
