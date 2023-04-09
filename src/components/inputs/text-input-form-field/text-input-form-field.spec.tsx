import TextInputFormField from '@components/inputs/text-input-form-field/text-input-form-field';
import { act, fireEvent, render } from '@testing-library/react';

describe('TextInputFormField', () => {
  it('should be defined.', () => {
    expect(TextInputFormField).toBeDefined();
  });

  it('should render.', () => {
    const { container } = render(<TextInputFormField />);
    expect(container).toBeDefined();
  });

  it('should render with label.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    expect(container).toBeDefined();
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
  });

  it('should render with initial value and label.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value and label and disabled.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('should render with initial value and label and disabled', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input');
    expect(inputItem).toBeDefined();
    expect(inputItem?.value).toEqual('Test');
    const labelItem = container.querySelector('label');
    expect(labelItem).toBeDefined();
    expect(labelItem?.textContent).toEqual('Test');
  });

  it('when disabled should not change value', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    expect(container).toBeDefined();
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    inputItem.focus();
    fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    expect(inputItem.value).toEqual('Test');

  });

  it('when not disabled should change value', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });
    expect(inputItem.value).toEqual('Updated test value');
    act(() => {
      fireEvent.blur(inputItem);
    });
    expect(inputItem.value).toEqual('Updated test value');
    act(() => {
      fireEvent.change(inputItem, { target: { value: 'Updated test value 2' } });
    });
    expect(inputItem.value).toEqual('Updated test value 2');
  });

  it('when disabled should not call onChanged', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true}
                                                     onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });


    expect(onChanged).not.toHaveBeenCalled();
  });

  it('when not disabled should call onChanged', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });

    expect(onChanged).toHaveBeenCalled();
  });

  it('when not disabled should call onChanged with correct value', () => {
    const onChanged = jest.fn();
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' onChanged={onChanged} />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });

    expect(onChanged).toHaveBeenCalledWith('Updated test value');
  });

  it('when disabled label and initialValue are available, label should have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' disabled={true} />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label and initialValue are available, ' +
    'label should have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField initialValue='Test' label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label and initialValue are not available, ' +
    'label should not have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).not.toContain('floating');
  });
  it('when not disabled label avilable, but initialValue is not available, ' +
    'label should not have class that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    expect(labelItem.className).not.toContain('floating');
  });
  it('when not disabled label available and initialValue is not available, ' +
    'on focus, label should gain class name that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
    });
    expect(labelItem.className).toContain('floating');
  });

  it('when not disabled label available and initialValue is not available, ' +
    'after typing, label should gain class name that includes substring floating.', () => {
    const { container } = render(<TextInputFormField label='Test' />);
    const inputItem = container.querySelector('input') as HTMLInputElement;
    const labelItem = container.querySelector('label') as HTMLLabelElement;
    act(() => {
      inputItem.focus();
      fireEvent.change(inputItem, { target: { value: 'Updated test value' } });
    });
    expect(labelItem.className).toContain('floating');

  });
});
