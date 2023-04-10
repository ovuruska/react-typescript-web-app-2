import { fireEvent, render } from '@testing-library/react';
import BtnSecondary from '@components/buttons/btn-secondary';

describe('BtnSecondary', () => {
  it('should be defined', () => {
    expect(BtnSecondary).toBeDefined();
  });
  it('should render correctly', () => {
    const { container } = render(<BtnSecondary text={'text'} src={'src'} backgroundColor={'#fff'} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with onClick', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<BtnSecondary text={'text'} src={'src'} backgroundColor={'#fff'} onClick={onClick} />);
    const button = getByTestId('btn-secondary');
    fireEvent.click(button);
    expect(onClick).toBeCalled();

  });
});
