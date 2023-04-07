import CustomCalendar from "@components/book/calender/custom-calender";
import { useCallback, useMemo, useState } from "react";
import { useInjection } from "inversify-react";
import {
  GetMonthlyCapacityUseCase,
} from "@domain/usecases/capacity/get-monthly-capacity";
import { CapacityDetails } from "@domain/types/common/capacity-details";
import styles from "./surge-calendar.module.scss";
import useMonthlyCapacity from '@hooks/use-monthly-capacity';

export type SurgeCalendarProps = {
  initialDate?: Date;
  employees?: number[];
  branches?: number[];
  onChange?: (date: Date) => void;
  service?: string;
};

const SurgeCalendar: React.FC<SurgeCalendarProps> = ({
  initialDate = new Date(),
  employees= [],
  branches = [],
  onChange,
  service = "Full Grooming",
}) => {
  const [date, setDate] = useState<Date>(initialDate);

  const getMonthlyCapacity = useInjection(GetMonthlyCapacityUseCase);


  const memoizedEmployees = useMemo(() => employees, [employees]);
  const memoizedBranches = useMemo(() => branches, [branches]);
  const memoizedService = useMemo(() => service, [service]);
  const capacityMap = useMonthlyCapacity({
    date,
    employees: memoizedEmployees,
    branches: memoizedBranches,
    service: memoizedService,

  });

  const handleChange = (newDate: Date) => {
    setDate(newDate);
    onChange && onChange(date);
  };

  const mapDateToClassName = useCallback(
    (date: Date) => {
      const result: CapacityDetails | undefined = capacityMap.get(
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      );
      if (result) {
        const total = result.afternoon_capacity + result.morning_capacity;
        if (total <= 0.5) {
          return styles.surgeCalendarEmpty;
        } else if (total <= 1.0) {
          return "";
        } else {
          return styles.surgeCalendarFull;
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
