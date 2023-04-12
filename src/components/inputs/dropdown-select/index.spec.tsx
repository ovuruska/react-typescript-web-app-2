import DropdownSelect from '@components/inputs/dropdown-select/index';
import { act, fireEvent, render } from '@testing-library/react';

const options = [{ value: 'Poodle', label: 'Poodle' }, { value: 'Labrador', label: 'Labrador' }, {
  value: 'Bulldog', label: 'Bulldog',
}, { value: 'Beagle', label: 'Beagle' },

];

describe('DropdownSelect', () => {
  it('should be defined.', () => {
    expect(DropdownSelect).toBeDefined();
  });
  it('should render correctly.', () => {
    const { container } = render(<DropdownSelect options={options} />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly with label.', () => {
    const { container } = render(<DropdownSelect options={options} label={'Dog Breed'} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('label')).toBeDefined();
    expect(container.querySelector('label')?.textContent).toEqual('Dog Breed');
  });
  it('should render correctly with initial value.', () => {
    const { container } = render(<DropdownSelect options={options} initialValue={options[0]} />);
    expect(container.querySelector('div')?.textContent).toEqual('Poodle');
  });
  it('should render correctly with initial value and label.', () => {
    const { container,getByTestId } = render(<DropdownSelect options={options} initialValue={options[0]} label={'Dog Breed'} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('label')).toBeDefined();
    // include Dog Breed in label.
    expect(container.querySelector('label')?.textContent).toEqual('Dog Breed');
    const value = getByTestId('dropdown-select-value');
    expect(value).toBeDefined();
    expect(value.textContent).toEqual('Poodle');
  });

  it('dropdown should open when clicked.', () => {
    const { getByTestId,getAllByTestId } = render(<DropdownSelect options={options} />);
    const dropdown = getByTestId('dropdown-select');

    act(() => {
      fireEvent.click(dropdown);

    });

    const optionItems = getAllByTestId('dropdown-select-option-item');
    expect(optionItems.length).toEqual(4);
    expect(optionItems[0].textContent).toEqual('Poodle');
    expect(optionItems[1].textContent).toEqual('Labrador');
    expect(optionItems[2].textContent).toEqual('Bulldog');
    expect(optionItems[3].textContent).toEqual('Beagle');




  });
  it('on select should be called when an option is clicked.', () => {
    const onSelect = jest.fn();
    const { getByTestId,getAllByTestId } = render(<DropdownSelect options={options} onSelect={onSelect} />);
    const dropdown = getByTestId('dropdown-select');

    act(() => {
      fireEvent.click(dropdown);

    });
    const optionItems = getAllByTestId('dropdown-select-option-item');
    act(() => {
      fireEvent.click(optionItems[0]);

    });
    expect(onSelect).toBeCalled();
    expect(onSelect).toBeCalledWith('Poodle');
  });


});
