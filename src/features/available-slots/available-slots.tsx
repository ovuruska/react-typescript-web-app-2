import React, {useEffect} from 'react';
import {useInjection} from "inversify-react";
import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import {GetAvailableSlotsParams, GetAvailableSlotsUseCase} from "@domain/usecases/get-available-slots";

type AvailableSlotsProps = {
  date: Date; employees?: number[]; branches?: number[]; onClick?: () => void; service: string; duration?: number;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
                                                         date, employees, branches, service, duration,
                                                       }) => {
  const getAvailableSlots = useInjection<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase);


  const [slots, setSlots] = React.useState<DailyAvailableSlot[]>([]);

  useEffect(() => {
    const dateStr = date.toISOString().split('T')[0];
    const params = {
      date: dateStr, employees, branches, service, duration,
    } as GetAvailableSlotsParams;
    getAvailableSlots.call(params).then((response) => {
      setSlots(response as DailyAvailableSlot[]);
    });
  }, [date, employees, branches, service, duration]);
  return (<div>
      {slots.map((slot) => (<div key={slot.start}>
          {slot.start} - {slot.end}
        </div>))}
    </div>);
}


export default AvailableSlots;
