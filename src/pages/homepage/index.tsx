import HomePageDumb from './index.dumb';
import useUpcomingAppts from '@hooks/appointments/use-upcoming-appts';
import useAllPets from '@hooks/use-all-pets';
import { OrderActions } from '@quicker/store/order-slice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/routes';

const HomePage: React.FC = () => {
  const upcomingAppts = useUpcomingAppts();

  const { pets } = useAllPets();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onServiceCardClick = (serviceName: string) => {
    if(pets.length > 0) {
      dispatch(OrderActions.setPet(pets[0]));
      return true;
    }
    else {
      dispatch(OrderActions.setOrderType(serviceName));
      navigate(RouteNames.ADD_PET);
      return false;
    }
  }

  const onAppointmentClick = () => {
    navigate(RouteNames.APPOINTMENTS);
  }

  return <HomePageDumb onAppointmentClick={onAppointmentClick} onServiceCardClick={onServiceCardClick} appointments={upcomingAppts} pets={pets}/>;
};

export default HomePage;
