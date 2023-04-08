import CustomCalendar from "@components/book/calender/custom-calender";
import { useCallback,  useState } from "react";

import { CapacityDetails } from "@domain/types/common/capacity-details";
import styles from "./surge-calendar.module.scss";
import useMonthlyCapacity from '@hooks/use-monthly-capacity';
import { getDateString } from '@utils/date-utils';

export type SurgeCalendarProps = {
  initialDate?: Date;
  employees?: number[];
  branches?: number[];
  onChange?: (date: Date) => void;
  service?: string;
};

const SurgeCalendar: React.FC<SurgeCalendarProps> = ({
  initialDate = new Date(),
  employees,
  branches,
  onChange,
  service = "Full Grooming",
}) => {
  const [date, setDate] = useState<Date>(initialDate);

  const handleChange = useCallback(
    (newDate: Date) => {
      setDate(newDate);
      if (onChange) {
        onChange(newDate);
      }
    },
    [onChange]
  );

  return (
    <div>
      <CustomCalendar
        date={date}
        onChange={handleChange}
      />
    </div>
  );
};

export default SurgeCalendar;
