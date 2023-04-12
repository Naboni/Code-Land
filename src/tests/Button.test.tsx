import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import Button from "../components/Button";

describe("Button", () => {
  it("renders correctly with text", () => {
    const { getByText } = render(
      <Button onClick={() => {}}>Click Me</Button>
    );
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it('calls onClick function on click', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    const { getByText } = render(<Button onClick={() => {}} disabled>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toBeDisabled();
  });
});
