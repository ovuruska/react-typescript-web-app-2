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

  const capacityMap = useMonthlyCapacity({
    date,
    employees,
    branches,
    service,

  });

  const handleChange = useCallback(
    (newDate: Date) => {
      setDate(newDate);
      if (onChange) {
        onChange(newDate);
      }
    },
    [onChange]
  );

  const mapDateToClassName = useCallback(
    (date: Date) => {
      const dateKey = getDateString(date.getDate(), date.getMonth() , date.getFullYear());
      const result: CapacityDetails | undefined = capacityMap.get(dateKey);
      if (result) {
        const total = result.afternoon_capacity + result.morning_capacity;
        if (total <= 0.5) {
          return styles.surgeCalendar__empty;
        } else if (total <= 1.0  ) {
          return "";
        } else {
          return styles.surgeCalendar__full;
        }
      } else {
        return "";
      }
    },
    [capacityMap]
  );
  return (
    <div>
      <CustomCalendar
        mapDateToClassName={mapDateToClassName}
        date={date}
        onChange={handleChange}
      />
    </div>
  );
};

export default SurgeCalendar;
