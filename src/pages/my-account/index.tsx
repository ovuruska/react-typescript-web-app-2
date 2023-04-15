import MyAccountDumb from '@pages/my-account/index.dumb';
import { useNavigate } from 'react-router-dom';
import useMe from '@hooks/use-me';
import PageCard from '@components/cards/page-card/page-card';
import { HttpClient } from '@quicker/common/http-client';
import { useInjection } from 'inversify-react';
import { HttpClientSymbol } from '@domain/types/TYPES';

const MyAccountPage = () => {

  const navigate = useNavigate();
  const me = useMe();
  const client = useInjection<HttpClient>(HttpClientSymbol);

  const gotoAppointments = () => {
    navigate('/appointments');
  }

  const gotoPets = () => {
    navigate('/pets');
  }

  const goBack = () => {
    window.history.back();
  }

  const handleLogout = () => {
    client.logout();
    navigate('/login');
  }

  return <PageCard><MyAccountDumb
    goBack={goBack}
    onClickAppointments={gotoAppointments}
    onClickMyPets={gotoPets}
    onClickLogout={handleLogout}
    name={me?.name ?? ""}
    email={me?.email ?? ""}
  /></PageCard>
}

export default MyAccountPage;
