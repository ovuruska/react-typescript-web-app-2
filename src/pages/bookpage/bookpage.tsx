import "./bookpage.scss";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@quicker/store/store";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";
import SelectBranches from "@features/select-branches/select-branches";
import AvailableSlots from "@features/available-slots/available-slots";
import SelectGroomers from "@features/select-groomers/select-groomers";
import SelectTime from "@features/select-time/select-time";
import {BranchEntity} from "@domain/types/common/branch";
import {EmployeeEntity} from "@domain/types/common/employee";
import {OrderActions} from "@quicker/store/order-slice";
import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import ServiceHeader from '@features/service-header/service-header';
import { PetEntity } from '@domain/types/common/pet';

const BookPage: React.FC = () => {
  const [petNames, setPetNames] = useState<Array<string>>([]);
  const [date,setDate] = useState<Date>(new Date());
  const [branches,setBranches] = useState<Array<number>>([]);
  const [groomers,setGroomers] = useState<Array<number>>([]);
  const [times,setTimes] = useState<Array<string>>(["morning","afternoon","evening"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = useSelector((state: RootState) => {
    return state.order.orderType;
  });

  const handleSelectBranches = (branches:BranchEntity[]) => {
    setBranches(branches.map((branch) => branch.id));
  }

  const handleSelectEmployees = (employees:EmployeeEntity[]) => {
    setGroomers(employees.map((employee) => employee.id));
  }

  const onBook = (slot:DailyAvailableSlot) => {
    const branch = slot.branch
    const employee = slot.employee;
    const start = slot.start;

    dispatch(OrderActions.setOrder({
      branch,
      groomer: employee,
      start
    }));
    navigate("/add-ons");
  }
  return (
    <div className="book-page page">
      <ServiceHeader/>
      <div className="calender-row calendar-row-top">
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

        <AvailableSlots onSelect={onBook} date={date} service={type} times={times} branches={branches} employees={groomers}  />
      </div>
    </div>
  );
};

export default BookPage;
