import BookingJourney from '@components/journeys/booking-journey/index';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';

const petGenerator = new PetMockGenerator();

const initialState = {
  order: {
    step: 0,
    orderType: 'Grooming',
  },
  pets:{
    pets:petGenerator.generateMany(5)
  },
};


describe('BookingJourney', () => {

  let mockStore:any;
  let store:MockStore;

  beforeEach(() => {
    mockStore = configureMockStore();
    store = mockStore(initialState);
  });


  it('should be defined.', () => {
    expect(BookingJourney).toBeTruthy();
  });

  it('should render correctly', () => {
    const { container } = render(<Provider store={store}><BookingJourney selectable={false} ><div></div></BookingJourney></Provider>);

    expect(container).toMatchSnapshot();
  });

  it('should include dropdown when selectable is true.', () => {
    const { getByTestId } = render(<Provider store={store}><BookingJourney selectable={true} ><div></div></BookingJourney></Provider>);
    const dropdown = getByTestId('dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should not include dropdown when selectable is false.', () => {
    const { queryByTestId } = render(<Provider store={store}><BookingJourney selectable={false} ><div></div></BookingJourney></Provider>);
    const dropdown = queryByTestId('dropdown');
    expect(dropdown).toBeFalsy();
  });



});

