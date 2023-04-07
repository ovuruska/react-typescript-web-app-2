import React, { useEffect } from 'react';
import { GetMonthlyCapacityParams, GetMonthlyCapacityUseCase } from '@domain/usecases/capacity/get-monthly-capacity';
import { MonthlyCapacityResponse } from '@domain/types/responses/monthly-capacity-response';
import { CapacityDetails } from '@domain/types/common/capacity-details';
import { useInjection } from 'inversify-react';


interface UseMonthlyCapacityParams {
  date: Date;
  employees: number[];
  branches: number[];
  service: string;

}

const useMonthlyCapacity = ({
  date,
  employees ,
  branches ,
  service
                            } : UseMonthlyCapacityParams) : Map<string, CapacityDetails> => {

  const getMonthlyCapacity = useInjection(GetMonthlyCapacityUseCase);
  const [capacityMap, setCapacityMap] = React.useState<Map<string, CapacityDetails>>(new Map<string, CapacityDetails>());

  useEffect(() => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateString = `${month + 1}/${year}`;
    const params: GetMonthlyCapacityParams = {
      date: dateString,
      employees,
      branches,
      service,
    };
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


  }, [service, date, service,employees, branches]);
  return capacityMap;
}

export default useMonthlyCapacity;
