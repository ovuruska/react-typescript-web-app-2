import { Link } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Dropdown from '@components/book/dropdown/dropdown';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@quicker/store/store';
import Pet from '@quicker/interfaces/Pet';
import './service-header.scss';

const ServiceHeader = () => {
  const [petNames, setPetNames] = useState<Array<string>>([]);

  const type = useSelector((state: RootState) => {
    return state.order.orderType;
  });

  const pets: Array<Pet> = useSelector((state: RootState) => {
    return state.pets.pets;
  });

  useEffect(() => {
    setPetNames([]);
    pets.forEach((pet) => {
      setPetNames((old) => {
        return [...old, pet.name];
      });
    });
  }, [pets]);

  return <div className={`service-pet-row ${type.toLowerCase().replace(" ","")}-row`}>
    <Link to={"/"}>
      <BiLeftArrowAlt size={"35px"} />
    </Link>
      <div className="service-title">
        <h3 className={`${type.toLowerCase().replace(" ","")}-heading`}>{type}</h3>
        <h2>Book for</h2>
      </div>


    <div className="dropdown-wrapper">
      <Dropdown
        width="100%"
        dropdownTitle={petNames[0] ?? "Select Pet"}
        dropdownList={petNames as string[]}
      />
    </div>
  </div>
}

export default ServiceHeader;
