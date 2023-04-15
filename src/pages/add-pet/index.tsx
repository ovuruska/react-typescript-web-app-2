import React from 'react';
import style from './index.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import TextInputFormField from '@components/inputs/text-input-form-field';
import PetBreedSelect from '@pages/add-pet/pet-breed-select';
import PetGenderSelect from '@components/inputs/pet-gender-select';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import PetAgeSelect from '@pages/add-pet/pet-age-select';
import PetWeightSelect from '@pages/add-pet/pet-weight-select';
import { useNavigate } from 'react-router-dom';
import PageCard from '@components/cards/page-card/page-card';
import AddPetDumb from '@pages/add-pet/index.dumb';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({}: AddPetPageProps) => {


  const navigate = useNavigate();


  const goBack = () => {
    navigate('/');
  };

  return <PageCard><AddPetDumb goBack={goBack} /></PageCard>;
};

export default AddPetPage;
