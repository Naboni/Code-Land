import { render, screen } from '@testing-library/react'
import Questions from '../pages/Questions';

test("Example 1 renders successfully", () => {
    render(<Questions/>);

    const element = screen.getByText(/Add question/i);

    expect(element).toBeInTheDocument();
})