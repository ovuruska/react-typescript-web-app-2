import CustomCalendar from "@components/book/calender/custom-calender";
import {useState} from "react";
import {useInjection} from "inversify-react";

const SurgeCalendar = () => {

  const [date, setDate] = useState<Date>(new Date());
  useInjection("SurgeCalendarService");

  const handleChange = (newDate: Date) => {
    if(date.getMonth() != newDate.getMonth() || date.getFullYear() != newDate.getFullYear()){

    }
    setDate(newDate);
  }


  return (
    <div>
      <CustomCalendar date={date} onChange={handleChange}/>
    </div>
  );
}


export default SurgeCalendar;
