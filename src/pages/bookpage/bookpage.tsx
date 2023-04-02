import "./bookpage.css";
import { useSelector } from "react-redux";
import { RootState } from "@quicker/store/store";
import { BiLeftArrowAlt } from "react-icons/bi";
import Dropdown from "../../components/book/dropdown/dropdown";
import { useEffect, useState } from "react";
import Pet from "../../interfaces/Pet";
import { Link } from "react-router-dom";
import CustomCalendar from "@quicker/components/book/calender/custom-calender";

const BookPage: React.FC = () => {
  const [petNames, setPetNames] = useState<Array<String>>([]);

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
  return (
    <div className="book-page page">
      <div className={`service-pet-row ${type.toLowerCase()}-row`}>
        <Link to={"/"}>
          <BiLeftArrowAlt size={"35px"} />
        </Link>
        <div className="service-title">
          <h3 className={`${type.toLowerCase()}-heading`}>{type}</h3>
          <h1>Book for</h1>
        </div>
        <div className="dropdown-wrapper">
          <Dropdown
            dropdownList={petNames}
            width="100%"
            dropdownTitle={petNames[0]}
          />
        </div>
      </div>
      <div className="calender-row">
        <div className="calender-header-row">
          <h2>Choose Date</h2>
        </div>
        <CustomCalendar />
      </div>
    </div>
  );
};

export default BookPage;
