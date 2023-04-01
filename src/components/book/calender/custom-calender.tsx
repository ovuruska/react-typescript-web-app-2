import React, { useEffect, useState } from "react";
import "./custom-calender.css";
import "../../../App.css";
import moment from "moment";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

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
  const [activeDay, setActiveDay] = useState<number>(new Date().getDate());

  function setDates() {
    let startDate;
    if (
      new Date(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      ).getDay() === 0
    ) {
      startDate = moment(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      )
        .subtract(1, "day")
        .startOf("week")
        .add(1, "day");
    } else {
      console.log();
      startDate = moment(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      )
        .startOf("month")
        .startOf("week")
        .add(1, "day");
    }
    let endDate;
    if (
      moment(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      )
        .endOf("month")
        .day() === 0
    ) {
      endDate = moment(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      ).endOf("month");
    } else {
      endDate = moment(
        `${currentYear}-${
          currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)
        }-01`
      )
        .endOf("month")
        .endOf("week")
        .add(1, "day");
    }

    const dateRange = [];
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      dateRange.push(currentDate.toDate());
      currentDate = currentDate.clone().add(1, "day");
    }
    setDateRange(dateRange);
  }

  useEffect(() => {
    setDates();
  }, [currentMonth, currentYear]);

  return (
    <div className="calender">
      <div className="calender-control">
        <MdOutlineKeyboardArrowLeft
          size={"30px"}
          onClick={() => {
            setCurrentMonth((old) => old - 1);
          }}
        />
        <div className="date">
          <h1>{monthNames[currentMonth - 1]}</h1>
          <h3>{currentYear}</h3>
        </div>
        <MdOutlineKeyboardArrowRight
          size={"30px"}
          onClick={() => {
            setCurrentMonth((old) => old + 1);
          }}
        />
      </div>
      <div className="dates-wrapper">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
          return <span className="date-box date-box-day">{day}</span>;
        })}
        {dateRange.map((date) => {
          return date.getMonth() + 1 === currentMonth ? (
            <div
              className="date-box"
              onClick={() => {
                setActiveDay(date.getDate());
              }}
              style={{
                background:
                  date.getDate() === activeDay
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,0)",
                color: date.getDate() === activeDay ? "white" : "black",
              }}
            >
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
