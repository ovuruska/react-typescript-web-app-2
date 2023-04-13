import MyAccountDumb from '@pages/my-account/index.dumb';
import { useNavigate } from 'react-router-dom';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';

const MyAccountPage = () => {

  const navigate = useNavigate();
  const me = useMe();

  const gotoAppointments = () => {
    navigate('/appointments');
  }
  const goBack = () => {
    window.history.back();
  }

  return <PageCard><MyAccountDumb
    goBack={goBack}
    onClickAppointments={gotoAppointments}
    name={me?.name ?? ""}
    email={me?.email ?? ""}
  /></PageCard>
}

export default MyAccountPage;
