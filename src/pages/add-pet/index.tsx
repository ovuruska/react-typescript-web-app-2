import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageCard from '@components/cards/page-card/page-card';
import AddPetDumb from '@pages/add-pet/index.dumb';
import { useInjection } from 'inversify-react';
import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { useDispatch } from 'react-redux';
import { PetsActions } from '@quicker/store/pet-slice';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({}: AddPetPageProps) => {


  const navigate = useNavigate();
  const createPet = useInjection<CustomerCreatePetUseCase>(CustomerCreatePetUseCase);
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = (request:CreatePetRequest) =>{
    goBack();
    createPet.call(request).then((response) => {
      dispatch(PetsActions.addPet(response));
    });

  }

  return <PageCard><AddPetDumb submit={handleSubmit} goBack={goBack} /></PageCard>;
};

export default AddPetPage;
