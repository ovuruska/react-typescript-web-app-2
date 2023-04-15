import React from 'react';
import useAllAppointments from '@pages/appointments/index.hooks';
import AppointmentsPageDumb from '@pages/appointments/index.dumb';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';
import ShakingModal from '@components/layouts/shaking-modal';
import { AppointmentEntity } from '@domain/types/common/appointment';
import ApptCancelJourney from '@components/journeys/appt-cancel';


const AppointmentsPage = () => {
  const appointments = useAllAppointments();
  const me = useMe();
  const [appointment, setAppointment] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const pets = me?.dogs ?? [];

  const goBack = () => {
    window.history.back();
  }

  const handleApptClicked = (appt:AppointmentEntity) => {
    setAppointment(appt);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  }

  return <PageCard>
    <AppointmentsPageDumb onApptClicked={handleApptClicked} appointments={appointments} pets={pets} goBack={goBack}/>
    <ApptCancelJourney open={open} close={handleClose } appointment={appointment} />
  </PageCard>

}

export default AppointmentsPage;
