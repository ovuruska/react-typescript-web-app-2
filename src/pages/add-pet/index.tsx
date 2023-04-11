import React from "react";
import style from "./index.module.scss";
import { BiLeftArrow } from 'react-icons/bi';
import TextInputFormField from '@components/inputs/text-input-form-field/text-input-form-field';
import PetBreedSelect from '@pages/add-pet/pet-breed-select';
import PetGenderSelect from '@components/inputs/pet-gender-select';
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import PetAgeSelect from '@pages/add-pet/pet-age-select';
import PetWeightSelect from '@pages/add-pet/pet-weight-select';

export interface AddPetPageProps {

}


export const AddPetPage: React.FC<AddPetPageProps> = ({

}: AddPetPageProps) => {

  const [breed, setBreed] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [gender, setGender] = React.useState<string | null>(null);
  const [age, setAge] = React.useState<number | null>(null);
  const [weight, setWeight] = React.useState<number | null>(null);

  const [error,setError] = React.useState<boolean>(false);

  const handleSubmit = () => {
    if(gender && breed && name && weight && age) {
      setError(false);
    }else{
      setError(true);
    }
  }


  return <div className={style.addPetPage}>
    <div className={style.addPetPageTop}>
      <BiLeftArrow/>
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
      <PetAgeSelect onSelect={setAge}/>
      {error && !age?<div className={style.addPetPageError}>Age cannot be empty.</div> : <div style={{height:"16px"}}/>}
      <PetWeightSelect onSelect={setWeight}/>
      {error && !weight?<div className={style.addPetPageError}>Weight cannot be empty.</div> : <div style={{height:"16px"}}/>}
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

export default AddPetPage;
