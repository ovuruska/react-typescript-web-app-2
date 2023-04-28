import { BiLeftArrowAlt } from 'react-icons/bi';
import Dropdown from '@components/book/dropdown/dropdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@quicker/store/store';
import './service-header.scss';
import { OrderActions } from '@quicker/store/order-slice';
import { PetEntity } from '@domain/types/common/pet';
import ServiceHeaderDumb from '@features/service-header/service-header.dumb';
import { useNavigate } from 'react-router-dom';
import useAllPets from '@hooks/use-all-pets';

interface ServiceHeaderProps{
  selectable? : boolean;
  previous?:string;
}

const ServiceHeader : React.FC<ServiceHeaderProps>= ({
  selectable = true,previous
                       } : ServiceHeaderProps) => {
  const [petNames, setPetNames] = useState<Array<string>>([]);

  const {type,selectedPet} = useSelector((state: RootState) => {
    return {
      type:state.order.orderType,
      selectedPet:state.order.pet,
    }
  });
  const { pets } = useAllPets();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setPetNames([]);
    setPetNames(pets.map((pet:PetEntity) => pet.name));

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
    if(!previous) {
      window.history.back();
    }else{
      navigate(previous);
    }
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
