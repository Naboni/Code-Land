import { render, fireEvent  } from "@testing-library/react";
import Input from "../components/Input";

describe("Input", () => {
  it("renders correctly with text", () => {
    const { getByDisplayValue } = render(<Input value="Hello" onChange={() => {}} />);
    expect(getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('calls onChange function with new value on change', () => {
    const handleChange = jest.fn();
    const { getByDisplayValue } = render(<Input value="Hello" onChange={handleChange} />);
    const input = getByDisplayValue('Hello');
    fireEvent.change(input, { target: { value: 'World' } });
    expect(handleChange).toHaveBeenCalledWith('World');
  });
});
