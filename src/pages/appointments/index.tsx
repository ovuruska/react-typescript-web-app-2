import React from 'react';
import useAllAppointments from '@pages/appointments/index.hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@quicker/store/store';
import AppointmentsPageDumb from '@pages/appointments/index.dumb';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';


const AppointmentsPage = () => {
  const appointments = useAllAppointments();
  const me = useMe();

  const pets = me?.dogs ?? [];

  const goBack = () => {
    window.history.back();
  }

  return <PageCard>
    <AppointmentsPageDumb appointments={appointments} pets={pets} goBack={goBack}/>
  </PageCard>

}

export default AppointmentsPage;
