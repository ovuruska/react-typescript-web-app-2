import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageCard from '@components/cards/page-card/page-card';
import AddPetDumb from '@pages/add-pet/index.dumb';
import { useInjection } from 'inversify-react';
import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { useDispatch } from 'react-redux';
import { PetsActions } from '@quicker/store/pet-slice';
import { RouteNames } from '@quicker/routes';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({}: AddPetPageProps) => {


  const navigate = useNavigate();
  const createPet = useInjection<CustomerCreatePetUseCase>(CustomerCreatePetUseCase);
  const dispatch = useDispatch();
  const [_, setLoading] = useLoadingOverlay();

  const goBack = () => {
    navigate(RouteNames.HOME);
  };

  const handleSubmit = (request:CreatePetRequest) =>{
    setLoading(true);
    createPet.call(request).then((response) => {
      dispatch(PetsActions.addPet(response));
    }).finally(() => {
      setLoading(false);
      goBack();
    });

  }

  return <PageCard><AddPetDumb submit={handleSubmit} goBack={goBack} /></PageCard>;
};

export default AddPetPage;
