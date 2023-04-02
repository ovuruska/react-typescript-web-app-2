import React, {useEffect, useState} from "react";
import "./custom-calender.css";
import "../../../App.css";
import * as moment from "moment";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";

interface CustomCalendarProps {
  date?: Date;
  onChange?: (date: Date) => void;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

const CustomCalendar: React.FC<CustomCalendarProps> = ({
                                                         onChange, date = new Date()
                                                       }) => {
  const [dateRange, setDateRange] = useState<Array<Date>>([]);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [activeDay, setActiveDay] = useState<number>(date.getDate());

  function getStartDate() {
    const firstDayOfMonth = new Date(`${currentYear}-${currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)}-01`);
    const isSunday = firstDayOfMonth.getDay() === 0;
    return isSunday ? moment(firstDayOfMonth).subtract(1, "day").startOf("week").add(1, "day") : moment(firstDayOfMonth).startOf("month").startOf("week").add(1, "day");
  }

  function getEndDate() {
    const endOfMonth = moment(`${currentYear}-${currentMonth < 10 ? "0" + String(currentMonth) : String(currentMonth)}-01`).endOf("month");
    const isSunday = endOfMonth.day() === 0;
    return isSunday ? endOfMonth : endOfMonth.endOf("week").add(1, "day");
  }

  function setDates() {
    const startDate = getStartDate();
    const endDate = getEndDate();

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

  const incrementMonth = () => {
    let newMonth, newYear;
    if (currentMonth === 12) {
      newYear = currentYear + 1;
      newMonth = 1;
    } else {
      newYear = currentYear;
      newMonth = currentMonth + 1;
    }

    const newMonthDays = new Date(newYear, newMonth, 0).getDate();
    if (activeDay > newMonthDays) {
      setActiveDay(newMonthDays);
    }

    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
    if (onChange !== undefined) {
      onChange(new Date(newYear, newMonth, activeDay));
    }
  };

  const decrementMonth = () => {
    let newMonth, newYear;
    if (currentMonth === 1) {
      newYear = currentYear - 1;
      newMonth = 12;
    } else {
      newYear = currentYear;
      newMonth = currentMonth - 1;
    }

    const newMonthDays = new Date(newYear, newMonth, 0).getDate();
    if (activeDay > newMonthDays) {
      setActiveDay(newMonthDays);
    }

    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
    if (onChange !== undefined) {
      onChange(new Date(newYear, newMonth, activeDay));
    }
  };

  const renderDaysOfWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => (<span key={day} className="date-box date-box-day">
{day}
</span>));
  };


  const renderDates = () => {
    return dateRange.map((date) => {
      const isActiveMonth = date.getMonth() + 1 === currentMonth;
      const isActiveDate = date.getDate() === activeDay;
      const dateBoxClass = isActiveMonth ? "date-box" : "date-box date-box-deactive";
      const dateStyle = isActiveDate ? {background: "rgba(0,0,0,1)", color: "white"} : {
        background: "rgba(0,0,0,0)", color: "black"
      };
      const onDateClick = () => {
        if (!isActiveDate) {
          setActiveDay(date.getDate());
          if (onChange !== undefined) {
            onChange(new Date(currentYear, currentMonth, date.getDate()));
          }
        }
      };

      return (<div
        key={date.toISOString()}
        className={dateBoxClass}
        onClick={onDateClick}
        data-testid={isActiveDate ? "active-date" : "date"}
        style={dateStyle}
      >
        <span>{date.getDate()}</span>
      </div>);
    });
  };

  return (<div className="calender" data-testid="calendar-instance">
    <div className="calender-control">
      <MdOutlineKeyboardArrowLeft
        data-testid="arrow-left"
        size={"30px"}
        onClick={decrementMonth}
      />
      <div className="date">
        <h1 data-testid="current-month">{monthNames[currentMonth - 1]}</h1>
        <h3 data-testid={"current-year"}>{currentYear}</h3>
      </div>
      <MdOutlineKeyboardArrowRight
        data-testid="arrow-right"
        size={"30px"}
        onClick={incrementMonth}
      />
    </div>
    <div className="dates-wrapper">
      {renderDaysOfWeek()}
      {renderDates()}
    </div>
  </div>);
};

export default CustomCalendar;
