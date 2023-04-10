import { fireEvent, render } from '@testing-library/react';
import BtnSecondary from '@components/buttons/rewards-btn';

describe('BtnSecondary', () => {
  it('should be defined', () => {
    expect(BtnSecondary).toBeDefined();
  });
  it('should render correctly', () => {
    const { container } = render(<BtnSecondary onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  it('should fire onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<BtnSecondary onClick={onClick} />);
    fireEvent.click(getByTestId('btn-secondary'));
    expect(onClick).toHaveBeenCalled();
  });
});
