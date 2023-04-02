import CustomCalendar from "@components/book/calender/custom-calender";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useInjection} from "inversify-react";
import {
  GetMonthlyCapacityParams, GetMonthlyCapacityUseCase,
} from "@domain/usecases/get-monthly-capacity";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {CapacityDetails} from "@domain/types/common/capacity-details";
import "./style.scss";
import {SurgeCalendarTheme} from "./surge-calendar-theme";

export type SurgeCalendarProps = {
  initialDate?: Date; employees?: number[]; branches?: number[]; onChange?: (date: Date) => void; service?: string;
};

const SurgeCalendar: React.FC<SurgeCalendarProps> = ({
                                                       initialDate = new Date(),
                                                       employees,
                                                       branches ,
                                                       onChange = () => {
                                                       },
                                                       service = "Full Grooming",
                                                     }) => {
  const [date, setDate] = useState<Date>(initialDate);

  const getMonthlyCapacity = useInjection(GetMonthlyCapacityUseCase);
  const [capacityMap, setCapacityMap] = useState<Map<string, CapacityDetails>>(new Map());
  console.log("capacityMap", capacityMap);

  const memoizedEmployees = useMemo(() => employees, [employees]);
  const memoizedBranches = useMemo(() => branches, [branches]);
  const memoizedService = useMemo(() => service, [service]);

  useEffect(() => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateString = `${month + 1}/${year}`;
    const params: GetMonthlyCapacityParams = {
      date: dateString, employees: memoizedEmployees, branches: memoizedBranches, service: memoizedService,
    };
    onChange(date);
    getMonthlyCapacity
      .call(params)
      .then((response: MonthlyCapacityResponse) => {
        const capacityDetails = response as CapacityDetails[];
        const newCapacityMap = new Map<string, CapacityDetails>();
        capacityDetails.forEach((capacityDetail: CapacityDetails) => {
          newCapacityMap.set(capacityDetail.date, capacityDetail);
        });
        setCapacityMap(newCapacityMap);
      });
  }, [service, date,memoizedService, memoizedEmployees, memoizedBranches,]);

  const handleChange = (newDate: Date) => {
    setDate(newDate);
  };

  const mapDateToClassName = useCallback((date: Date) => {
    const result: CapacityDetails | undefined = capacityMap.get(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
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
  }, [capacityMap]);

  return (<div>
      <CustomCalendar
        mapDateToClassName={mapDateToClassName}
        date={date}
        onChange={handleChange}
      />
    </div>);
};

export default SurgeCalendar;
