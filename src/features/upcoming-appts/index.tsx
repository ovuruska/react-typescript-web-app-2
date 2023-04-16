import useAllAppointments from '@pages/appointments/index.hooks';
import UpcomingApptsDumb from '@features/upcoming-appts/index.dumb';


const UpcomingAppts = () => {
  const upcomingAppts = useAllAppointments();
  return <UpcomingApptsDumb appointments={upcomingAppts}/>;

}

export default UpcomingAppts;
