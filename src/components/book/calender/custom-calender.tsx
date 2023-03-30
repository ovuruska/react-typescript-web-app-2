import React, { useEffect, useState } from "react";
import "./custom-calender.css";
import "../../../App.css";
import moment from "moment";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface CustomCalendarProps {}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomCalendar: React.FC<CustomCalendarProps> = ({}) => {
  const [value, onChange] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<Array<Date>>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const startDate = moment(
      `${currentYear}-${
        currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
      }-01`
    )
      .startOf("month")
      .startOf("week")
      .add(1, "day");
    const endDate = moment(
      `${currentYear}-${
        currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
      }-01`
    )
      .endOf("month")
      .endOf("week")
      .add(1, "day");

    const dateRange = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      dateRange.push(currentDate.toDate());
      currentDate = currentDate.clone().add(1, "day");
    }
    setDateRange(dateRange);
  }, [currentMonth, currentYear]);

  return (
    <div className="calender">
      <div className="calender-control">
        <IoIosArrowDropleft
          size={"40px"}
          onClick={() => {
            setCurrentMonth((old) => old - 1);
          }}
        />
        <div className="date">
          <h1>{monthNames[currentMonth - 1]}</h1>
          <h3>{currentYear}</h3>
        </div>
        <IoIosArrowDropright size={"40px"} />
      </div>
      <div className="dates-wrapper">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
          return (
            <div className="date-box date-box-day">
              <span>{day}</span>
            </div>
          );
        })}
        {dateRange.map((date) => {
          return date.getMonth() + 1 === currentMonth ? (
            <div className="date-box">
              <span>{date.getDate()}</span>
            </div>
          ) : (
            <div className="date-box date-box-deactive">
              <span>{date.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;