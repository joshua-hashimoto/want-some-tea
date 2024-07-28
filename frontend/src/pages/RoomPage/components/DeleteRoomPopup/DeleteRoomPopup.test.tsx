import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DeleteRoomPopup from "./DeleteRoomPopup";

describe("UI test", () => {
  test("test element is displaying", async () => {
    render(<DeleteRoomPopup open onDelete={vi.fn()} />);
    const title = await screen.findByText(/本当に削除しますか？/);
    expect(title).toBeInTheDocument();
    const btn = await screen.findByRole("button", { name: /削 除/ });
    expect(btn).toBeInTheDocument();
  });
});

describe("Action test", () => {
  test("onDelete can be called", async () => {
    const onDeleteMock = vi.fn();
    render(<DeleteRoomPopup open onDelete={onDeleteMock} />);
    const btn = await screen.findByRole("button", { name: /削 除/ });
    await userEvent.click(btn);
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
