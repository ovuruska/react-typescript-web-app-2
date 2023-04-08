import { BiLeftArrowAlt } from 'react-icons/bi';
import Dropdown from '@components/book/dropdown/dropdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@quicker/store/store';
import './service-header.scss';
import { OrderActions } from '@quicker/store/order-slice';
import { PetEntity } from '@domain/types/common/pet';

interface ServiceHeaderProps{
  selectable? : boolean;
}

const ServiceHeader : React.FC<ServiceHeaderProps>= ({
  selectable = true,
                       } : ServiceHeaderProps) => {
  const [petNames, setPetNames] = useState<Array<string>>([]);

  const {type,pets,pet:selectedPet} = useSelector((state: RootState) => {
    return {
      type:state.order.orderType,
      pets:state.pets.pets,
      pet:state.order.pet,
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(pets.length !== 0){
      dispatch(OrderActions.setPet(pets[0]));
    }

  });

  useEffect(() => {
    setPetNames([]);
    pets.forEach((pet) => {
      setPetNames((old) => {
        return [...old, pet.name];
      });
    });
    const pet = pets.filter((pet) => pet.name === petNames[0])[0] as PetEntity;
    dispatch(OrderActions.setPet(pet));
  }, [pets]);

  let title = "Book for"
  if (!selectable ) {
    title = "Book for " + selectedPet?.name ?? "";
  }

  const goBack = () => {
    window.history.back();
  };

  return <div className={`service-pet-row ${type.toLowerCase().replace(' ', '')}-row`}>
    <div className={"clickable"}>
      <BiLeftArrowAlt onClick={goBack} size={'35px'} />
    </div>
    <div className='service-title'>
      <h3 className={`${type.toLowerCase().replace(' ', '')}-heading`}>{type}</h3>
      <h1>{title}</h1>
    </div>
    {selectable &&
    <div className='dropdown-wrapper'>
      <Dropdown
        width='100%'
        dropdownTitle={petNames[0] ?? 'Select Pet'}
        dropdownList={petNames as string[]}
      />
    </div>
    }
  </div>;
};
export default ServiceHeader;
