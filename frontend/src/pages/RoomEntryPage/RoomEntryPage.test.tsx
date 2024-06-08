import { render, screen } from "@testing-library/react";

import RoomEntryPage from "./RoomEntryPage";

describe("UI test", () => {
  test("test elements is displaying", () => {
    render(<RoomEntryPage />);

    const title = screen.getByText(/部屋IDを入力/);
    expect(title).toBeInTheDocument();

    const inputLabel = screen.getByText(/入りたい部屋のIDを入力してください。/);
    expect(inputLabel).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const helpText = screen.getByText(/入力が完了すると、自動で遷移します。/);
    expect(helpText).toBeInTheDocument();
  });
});
