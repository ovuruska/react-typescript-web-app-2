import HomePageDumb from './index.dumb';
import useUpcomingAppts from '@hooks/appointments/use-upcoming-appts';
import useAllPets from '@hooks/use-all-pets';
import { OrderActions } from '@quicker/store/order-slice';
import { useDispatch } from 'react-redux';
import React from 'react';
import * as Console from 'console';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const upcomingAppts = useUpcomingAppts();
  const { pets } = useAllPets();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onServiceCardClick = () => {
    if(pets.length > 0) {
      dispatch(OrderActions.setPet(pets[0]));
      return true;
    }
    else {
      navigate("/add-pet");
      return false;
    }
  }

  return <HomePageDumb onServiceCardClick={onServiceCardClick} appointments={upcomingAppts} pets={pets}/>;
};

export default HomePage;
