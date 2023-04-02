import CustomCalendar from "@components/book/calender/custom-calender";
import { useEffect, useState } from "react";
import { useInjection } from "inversify-react";
import {
  GetMonthlyCapacityParams,
  GetMonthlyCapacityUseCase,
} from "@domain/usecases/get-monthly-capacity";
import { MonthlyCapacityResponse } from "@domain/types/responses/monthly-capacity-response";
import { CapacityDetails } from "@domain/types/common/capacity-details";
import "./style.scss";
import { SurgeCalendarTheme } from "./surge-calendar-theme";

export type SurgeCalendarProps = {
  initialDate?: Date;
  employees?: number[];
  branches?: number[];
  onChange?: (date: Date) => void;
  service?: string;
};

const SurgeCalendar: React.FC<SurgeCalendarProps> = ({
  initialDate = new Date(),
  employees = [],
  branches = [],
  onChange = () => {},
  service = "Full Grooming",
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  // useInjection : GetMonthlyCapacityUseCase
  const getMonthlyCapacityUseCase = useInjection(GetMonthlyCapacityUseCase);
  const [capacityMap, setCapacityMap] = useState<Map<string, CapacityDetails>>(
    new Map()
  );

  useEffect(() => {
    // mm/YYYY
    const dateString = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const params: GetMonthlyCapacityParams = {
      date: dateString,
      employees: employees,
      branches: branches,
      service: service,
    };
    onChange(date);
    getMonthlyCapacityUseCase
      .call(params)
      .then((response: MonthlyCapacityResponse) => {
        const capacityDetails = response as CapacityDetails[];
        const newCapacityMap = new Map<string, CapacityDetails>();
        capacityDetails.forEach((capacityDetail: CapacityDetails) => {
          capacityMap.set(capacityDetail.date, capacityDetail);
        });
        setCapacityMap(newCapacityMap);
      });
  }, [date.getMonth(), date.getFullYear(), employees, branches, service]);

  const handleChange = (newDate: Date) => {
    setDate(newDate);
  };

  const mapDateToClassName = (date: Date) => {
    const result: CapacityDetails | undefined = capacityMap.get(
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
    if (result) {
      const total = result.afternoon_capacity + result.morning_capacity;
      if (total <= 0.5) {
        return SurgeCalendarTheme.styles.empty;
      } else if (total <= 1) {
        return SurgeCalendarTheme.styles.partial;
      } else {
        return SurgeCalendarTheme.styles.full;
      }
    } else {
      return "";
    }
  };

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
