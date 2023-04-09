import React from 'react';
import BookingJourney from '@components/layouts/booking-journey';
import PaymentPageDumb from '@pages/payment/index.dumb';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface PaymentPageProps {
}

const PaymentPage: React.FC<PaymentPageProps> = ({}) => {


  const { employee, branch, date, service } = useSelector((state: any) => {
    return{
      employee: state.order.groomer, branch: state.order.branch, date: state.order.start, service: state.order.orderType,

    };
  });

  const navigate = useNavigate();

  const handleWarning = () => {
    navigate('/policy');
  }

  const handleCompleted = () => {
    navigate('/thank-you');
  }

  return <BookingJourney selectable={false}>
    <PaymentPageDumb onWarningClick={handleWarning} employee={employee} branch={branch} date={date} service={service} onCompleted={handleCompleted}/>
  </BookingJourney>;
};

export default PaymentPage;
