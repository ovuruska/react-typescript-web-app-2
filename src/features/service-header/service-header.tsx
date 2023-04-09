import { BiLeftArrowAlt } from 'react-icons/bi';
import Dropdown from '@components/book/dropdown/dropdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@quicker/store/store';
import './service-header.scss';
import { OrderActions } from '@quicker/store/order-slice';
import { PetEntity } from '@domain/types/common/pet';
import ServiceHeaderDumb from '@features/service-header/service-header.dumb';

interface ServiceHeaderProps{
  selectable? : boolean;
}

const ServiceHeader : React.FC<ServiceHeaderProps>= ({
  selectable = true,
                       } : ServiceHeaderProps) => {
  const [petNames, setPetNames] = useState<Array<string>>([]);

  const {type,pets,selectedPet} = useSelector((state: RootState) => {
    return {
      type:state.order.orderType,
      pets:state.pets.pets,
      selectedPet:state.order.pet,
    }
  });


  const dispatch = useDispatch();


  useEffect(() => {
    setPetNames([]);
    setPetNames(pets.map((pet:PetEntity) => pet.name));
    if(selectedPet == null && pets.length > 0){
      dispatch(OrderActions.setPet(pets[0]));
    }
  }, [pets]);

  const handleChange = (index:number) => {
    const pet = pets[index];
    dispatch(OrderActions.setPet(pet));
  }

  let title = "Book for"
  if (!selectable ) {
    title = "Book for " + selectedPet?.name ?? "";
  }
  const goBack = () => {
    window.history.back();
  };

  return <ServiceHeaderDumb
    goBack={goBack}
    type={type}
    selectable={selectable}
    petNames={petNames}
    handleChange={handleChange}
    title={title}
    selectedPet={selectedPet?.name}

  />

};
export default ServiceHeader;
