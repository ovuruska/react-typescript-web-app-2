import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageCard from '@components/cards/page-card/page-card';
import AddPetDumb from '@pages/add-pet/index.dumb';
import { useInjection } from 'inversify-react';
import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { useDispatch } from 'react-redux';
import { RouteNames } from '@quicker/routes';
import { useLoadingOverlay } from '@components/loading/loading-overlay/use-loading-overlay';
import { QuickerFirebaseStorage } from '@data/datasources/firebase/storage';
import { UploadProofRequest } from '@domain/types/requests/firebase/upload-proof';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({}: AddPetPageProps) => {


  const navigate = useNavigate();
  const createPet = useInjection<CustomerCreatePetUseCase>(CustomerCreatePetUseCase);
  const firebaseStorage = useInjection<QuickerFirebaseStorage>(QuickerFirebaseStorage);
  const [_, setLoading] = useLoadingOverlay();

  const goBack = () => {
    navigate(RouteNames.HOME);
  };

  const handleSubmit = (request:CreatePetRequest) =>{
    setLoading(true);
    createPet.call(request).then((response) => {
    }).finally(() => {
      setLoading(false);
      goBack();
    });
  }

  const handleProof = (request: UploadProofRequest) => {
    firebaseStorage.uploadProof(request).then((response) => {
    });
  }

  return <PageCard><AddPetDumb handleProof={handleProof} submit={handleSubmit} goBack={goBack} /></PageCard>;
};

export default AddPetPage;
