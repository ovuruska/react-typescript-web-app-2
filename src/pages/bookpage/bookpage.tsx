import "./bookpage.css";
import { useSelector } from "react-redux";
import { RootState } from "@quicker/store/store";
import { BiLeftArrowAlt } from "react-icons/bi";
import Dropdown from "../../components/book/dropdown/dropdown";
import { useEffect, useState } from "react";
import Pet from "../../interfaces/Pet";
import { Link } from "react-router-dom";
import CustomCalendar from "@quicker/components/book/calender/custom-calender";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";
import SelectBranch from "@features/select-branch/select-branch";

const BookPage: React.FC = () => {
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
            width="100%"
            dropdownTitle={petNames[0] ?? "Select Pet"}
            dropdownList={petNames as string[]}
          />
        </div>
      </div>
      <div className="calender-row">
        <div className={"book-page__select-branch"}>
          <SelectBranch width={"%100"}/>
        </div>
        <div className="calender-header-row">
          <h2>Choose Date</h2>
          <div className="legend-row">
            {
              // Create a rounded circle with the color of the legend #FF424B
            }
            <div className="legend legend--full"></div>
            <h3>Full</h3>
            <div className="legend legend--empty"></div>
            <h3>Available</h3>

          </div>
        </div>
        <SurgeCalendar />
      </div>
    </div>
  );
};

export default BookPage;
