import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AddCreditCardDumb } from '@pages/add-credit-card/index.dumb';

describe('AddCreditCardDumb', () => {
  it('should render successfully', () => {
    const onSubmit = jest.fn();
    const { baseElement } = render(<AddCreditCardDumb onSubmit={onSubmit}/>);
    expect(baseElement).toBeTruthy();
  });
  it('should not be submitted when form is invalid', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<AddCreditCardDumb onSubmit={onSubmit}/>);
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
  it('should be submitted when form is valid', async () => {
    const onSubmit = jest.fn();
    const { container,getAllByTestId,getByTestId,getByText } = render(<AddCreditCardDumb onSubmit={onSubmit}/>);
    const inputFields = getAllByTestId('text-input-form-field').map((input)=>input.querySelector('input') as HTMLInputElement);
    const controlledInput = getByTestId('text-input-form-field-controlled').querySelector('input') as HTMLInputElement;
    const submitButton = getByText('Submit');
    act(()=>fireEvent.change(inputFields[0], { target: { value: 'John Doe' } }));
    act(()=>fireEvent.change(inputFields[1], { target: { value: '1234567890123456' } }));
    act(()=>fireEvent.change(inputFields[2], { target: { value: '123' } }));
    act(()=>fireEvent.change(inputFields[3], { target: { value: '123 Main St' } }));
    act(()=>fireEvent.change(inputFields[4], { target: { value: 'Apt 1' } }));
    act(()=>fireEvent.change(inputFields[5], { target: { value: 'New York' } }));
    act(()=>fireEvent.change(inputFields[6], { target: { value: 'USA' } }));
    act(()=>fireEvent.change(inputFields[7], { target: { value: 'NY' } }));
    act(()=>fireEvent.change(inputFields[8], { target: { value: '12345' } }));
    act(()=>fireEvent.change(controlledInput, { target: { value: '12/24' } }));
    act(()=>fireEvent.click(submitButton));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenCalledWith({
      address: {
        addressLine1: '123 Main St',
        addressLine2: 'Apt 1',
        city: 'New York',
        country: 'USA',
        postalCode: '12345',
        state: 'NY',
      },
      brand: 'Visa',
      cardNumber: '1234567890123456',
      cardholderName: 'John Doe',
      CVV: '123',
      expDate: '12/24',

    },expect.anything());
  });
});
