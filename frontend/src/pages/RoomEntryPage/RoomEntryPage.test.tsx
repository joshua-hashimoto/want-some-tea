import { screen } from "@testing-library/react";

import { mockedNavigator, renderComponent } from "~/utils/tests";

import RoomEntryPage from "./RoomEntryPage";
import userEvent from "@testing-library/user-event";

test("test elements is displaying", () => {
  renderComponent(<RoomEntryPage />);

  const title = screen.getByText(/部屋IDを入力/);
  expect(title).toBeInTheDocument();

  const inputLabel = screen.getByText(/入りたい部屋のIDを入力してください。/);
  expect(inputLabel).toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();

  const helpText = screen.getByText(/入力が完了すると、自動で遷移します。/);
  expect(helpText).toBeInTheDocument();
});

describe("actions tests", () => {
  beforeEach(() => {
    // NOTE: docsとかにはないが、shouldAdvanceTimeをtrueにする必要がある
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  test("navigation test", async () => {
    renderComponent(<RoomEntryPage />);

    const input = screen.getByRole("textbox") as HTMLInputElement;

    await userEvent.type(input, "ROOM_ID");

    expect(input).toHaveValue("ROOM_ID");

    // NOTE: docsとかにはないが、awaitする必要がある
    await vi.advanceTimersByTime(1500);

    expect(mockedNavigator).toHaveBeenCalled();
  });
});
