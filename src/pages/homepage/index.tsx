import HomePageDumb from './index.dumb';
import useUpcomingAppts from '@hooks/appointments/use-upcoming-appts';
import useAllPets from '@hooks/use-all-pets';

const HomePage: React.FC = () => {
  const upcomingAppts = useUpcomingAppts();
  const { pets } = useAllPets();
  return <HomePageDumb appointments={upcomingAppts} pets={pets}/>;
};

export default HomePage;
