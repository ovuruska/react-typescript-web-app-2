import "./bookpage.css";
import { useSelector } from "react-redux";
import { RootState } from "@quicker/store/store";
import { BiLeftArrowAlt } from "react-icons/bi";
import Dropdown from "../../components/book/dropdown/dropdown";
import { useEffect, useState } from "react";
import Pet from "../../interfaces/Pet";
import {Link, useNavigate} from "react-router-dom";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";
import SelectBranches from "@features/select-branches/select-branches";
import AvailableSlots from "@features/available-slots/available-slots";
import SelectGroomers from "@features/select-groomers/select-groomers";
import SelectTime from "@features/select-time/select-time";
import {BranchEntity} from "@domain/types/common/branch";
import {EmployeeEntity} from "@domain/types/common/employee";

const BookPage: React.FC = () => {
  const [petNames, setPetNames] = useState<Array<string>>([]);
  const [date,setDate] = useState<Date>(new Date());
  const [branches,setBranches] = useState<Array<number>>([]);
  const [groomers,setGroomers] = useState<Array<number>>([]);
  const [times,setTimes] = useState<Array<string>>(["morning","afternoon","evening"]);
  const navigate = useNavigate();

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

  const handleSelectBranches = (branches:BranchEntity[]) => {
    setBranches(branches.map((branch) => branch.id));
  }

  const handleSelectEmployees = (employees:EmployeeEntity[]) => {
    setGroomers(employees.map((employee) => employee.id));
  }

  return (
    <div className="book-page page">
      <div className={`service-pet-row ${type.toLowerCase().replace(" ","")}-row`}>
        <Link to={"/"}>
          <BiLeftArrowAlt size={"35px"} />
        </Link>
        <div className="service-title">
          <h3 className={`${type.toLowerCase().replace(" ","")}-heading`}>{type}</h3>
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
          <SelectBranches onSelect={handleSelectBranches} />
        </div>
        <div className="calender-header-row">
          <h2>Choose Date</h2>
          <div className="legend-row">

            <div className="legend legend--full"></div>
            <h3>Full</h3>
            <div className="legend legend--empty"></div>
            <h3>Available</h3>
          </div>
        </div>
        <SurgeCalendar initialDate={date} onChange={setDate} />
      </div>
      <div className={"book-page__select-row"}>
        {type == "Grooming" ? <SelectGroomers onSelect={handleSelectEmployees}/> : null}
        <SelectTime onSelect={setTimes}/>
      </div>
      <div className="slots-row">
        <div className="calender-header-row">
          <h2>Select Time</h2>
        </div>

        <AvailableSlots onClick={() => navigate("/book-now")} date={date} service={type} times={times} branches={branches} employees={groomers}  />
      </div>
    </div>
  );
};

export default BookPage;
