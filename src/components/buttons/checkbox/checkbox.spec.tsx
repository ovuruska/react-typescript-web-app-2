import Checkbox from "@components/buttons/checkbox/checkbox";
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Checkbox', () => {
  it('should render', () => {
    const { container } = render(<Checkbox checked={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should render with label', () => {
    const label = "Label Includes Random Characters";
    // Check if label variable is visible in the snapshot

    const { container } = render(<Checkbox checked={false} label={label} />);

    expect(container).toMatchSnapshot();
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it('should render with checked', () => {
    const checked = true;
    // Check if checked variable is visible in the snapshot

    const { container } = render(<Checkbox checked={checked} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with onChecked', () => {
    const onChecked = jest.fn();
    // Check if onChecked variable is visible in the snapshot

    const { container } = render(<Checkbox checked={false} onChecked={onChecked} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with label, checked and onChecked', () => {
    const label = "Label Includes Random Characters";
    const checked = true;
    const onChecked = jest.fn();
    // Check if label, checked and onChecked variables are visible in the snapshot

    const { container } = render(<Checkbox checked={checked} label={label} onChecked={onChecked} />);

    expect(container).toMatchSnapshot();
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it('onChecked should be fired when clicked.', () => {
    const onChecked = jest.fn();
    // Check if onChecked function is called when clicked

    const { getByTestId } = render(<Checkbox checked={false} onChecked={onChecked} />);
    const checkbox = getByTestId("checkbox");

    checkbox.click();
    expect(onChecked).toBeCalled();
  });

});
