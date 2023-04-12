import { render } from "@testing-library/react";
import List from "../components/List";

describe("List", () => {
  it("renders correctly with items", () => {
    const items = [
      { id: 1, text: "item 1" },
      { id: 2, text: "item 2" },
      { id: 3, text: "item 3" },
      { id: 4, text: "item 4" },
    ];
    const { getByText } = render(<List items={items} />);
    expect(getByText("item 1")).toBeInTheDocument();
    expect(getByText("item 2")).toBeInTheDocument();
    expect(getByText("item 3")).toBeInTheDocument();
    expect(getByText("item 4")).toBeInTheDocument();
  });
});
