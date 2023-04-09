import React from 'react';
import BookingJourney from '@components/layouts/booking-journey';
import PolicyDumb from '@pages/policy/index.dumb';


const PolicyPage = () => {

  const handleClick = () => {
    // Go back
    window.history.back();
  }

  return <BookingJourney selectable={false}>
    <PolicyDumb onClick={handleClick} />
  </BookingJourney>;
};

export default PolicyPage;
