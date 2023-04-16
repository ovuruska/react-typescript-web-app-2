import HomePageDumb from './index.dumb';
import useUpcomingAppts from '@hooks/appointments/use-upcoming-appts';

const HomePage: React.FC = () => {
  const upcomingAppts = useUpcomingAppts();
  return <HomePageDumb appointments={upcomingAppts} pets={[]}/>;
};

export default HomePage;
