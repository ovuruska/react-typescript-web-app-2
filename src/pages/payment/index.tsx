import React from 'react';
import BookingJourney from '@components/journeys/booking-journey';
import PaymentPageDumb from '@pages/payment/index.dumb';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import { CreateAppointmentUseCase } from '@domain/usecases/appointment/create-appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

export interface PaymentPageProps {
}

const PaymentPage: React.FC<PaymentPageProps> = ({}) => {


  const { employee, branch,pet, date, service } = useSelector((state: any) => {
    return{
      employee: state.order.groomer, branch: state.order.branch, date: state.order.start, service: state.order.orderType,pet:state.selectedPet.pet,

    };
  });
  const createAppointment = useInjection(CreateAppointmentUseCase);
  const navigate = useNavigate();

  const handleWarning = () => {
    navigate('/policy');
  }

  const handleCompleted = () => {

    const createAppointmentParams = {
      employee: employee,
      branch: branch,
      date: date,
      pet:pet,
      service: (service === 'Grooming') ? 'Full Grooming' : 'We Wash',
      start: date.start,
    } as CreateAppointmentRequest;
    createAppointment.call(createAppointmentParams);

    navigate('/thank-you');
  }

  return <BookingJourney selectable={false}>
    <PaymentPageDumb onWarningClick={handleWarning} employee={employee} branch={branch} date={date} service={service} onCompleted={handleCompleted}/>
  </BookingJourney>;
};

export default PaymentPage;
