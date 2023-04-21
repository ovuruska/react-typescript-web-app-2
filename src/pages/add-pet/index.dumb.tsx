import React from "react";
import style from "./index.module.scss";
import { BiLeftArrow } from 'react-icons/bi';
import TextInputFormField from '@components/inputs/text-input-form-field';
import PetBreedSelect from '@pages/add-pet/pet-breed-select';
import PetGenderSelect from '@components/inputs/pet-gender-select';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import PetWeightSelect from '@pages/add-pet/pet-weight-select';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import PetBirthDateSelect from '@pages/add-pet/birth-date';

export interface AddPetPageProps {
  goBack?: () => void;
  submit?: (request:CreatePetRequest) => void;
}


export const AddPetDumb: React.FC<AddPetPageProps> = ({
  goBack,submit
                                                      }: AddPetPageProps) => {

  const [breed, setBreed] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [gender, setGender] = React.useState<string | null>(null);
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);
  const [weight, setWeight] = React.useState<number | null>(null);

  const [error,setError] = React.useState<boolean>(false);
  const [birthDateError,setBirthDateError] = React.useState<string>("");

  const handleSubmit = () => {
    if(gender && breed && name && weight && birthDate) {
      setError(false);
      setBirthDateError("Birth date cannot be empty.")
      const request = {
        name,
        breed,
        gender,
        birthDate:birthDate.toISOString(),
        weight,
      }
      submit && submit(request)
    }else{
      setError(true);
    }
  }

  const handleGoBack = () => {
    goBack && goBack()
  }

  const handleBirthDateChange = (date:Date) => {
    setBirthDate(date);
    // Birth date cannot be in the future or more than 32 years ago
    //
    const now = new Date();

    if(date.getTime() > now.getTime()){
      setBirthDateError("Birth date cannot be in the future.");
    }else if(date.getTime() < now.setFullYear(now.getFullYear() - 32)){
      setBirthDateError("Birth date cannot be more than 32 years ago.");
    }else{
      setBirthDateError("");
    }
  }

  return <div className={style.addPetPage}>
    <div className={style.addPetPageTop}>
      <BiLeftArrow onClick={handleGoBack}/>
      <h1>Add Pet</h1>
    </div>

    <div className={style.addPetPage__form}>
      <h3 className={style.addPetPage__formHeader}>
        Dog information
      </h3>
      <TextInputFormField label={"Name"} onChanged={setName}/>
      {(error && !name) ? <div className={style.addPetPageError}>Name cannot be empty.</div> : <div style={{height:"16px"}}/>}
      <PetBreedSelect onSelect={setBreed}/>
      {(error && !breed )? <div className={style.addPetPageError}>Breed cannot be empty.</div> : <div style={{height:"16px"}}/>}
      <PetGenderSelect onSelect={setGender}/>
      {error && !gender?<div className={style.addPetPageError}>Gender cannot be empty.</div> : <div style={{height:"16px"}}/>}

      <PetWeightSelect onSelect={setWeight}/>
      {error && !weight?<div className={style.addPetPageError}>Weight cannot be empty.</div> : <div style={{height:"16px"}}/>}
      <h4>Birth Date</h4>
      <PetBirthDateSelect onChange={handleBirthDateChange}/>
      {(birthDateError!=="") ? <div className={style.addPetPageError}>{birthDateError}</div> : <div style={{height:"16px"}}/>}
      <div style={{
        height:"8px"
      }}/>

      <div style={{
        height:"16px"
      }}/>
      <CtaPrimary onClick={handleSubmit} content={"Submit"}/>
    </div>

  </div>
}

export default AddPetDumb;
