import React, { Fragment, useEffect } from "react";
import { useInjection } from "inversify-react";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import {
  GetAvailableSlotsParams,
  GetAvailableSlotsUseCase,
} from "@domain/usecases/available/get-available-slots";
import SlotCard from "@components/book/slot-card/slot-card";
import "./available-slots.css";

type AvailableSlotsProps = {
  date: Date;
  employees?: number[];
  branches?: number[];
  onClick?: () => void;
  service: string;
  duration?: number;
};

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
  date,
  employees,
  branches,
  service,
  duration,
}) => {
  const getAvailableSlots = useInjection<GetAvailableSlotsUseCase>(
    GetAvailableSlotsUseCase
  );

  const [slots, setSlots] = React.useState<DailyAvailableSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = React.useState<number>(-1);

  useEffect(() => {
    const dateStr = date.toISOString().split("T")[0];

    const params = {
      date: dateStr,
      employees,
      branches,
      service,
      duration,
    } as GetAvailableSlotsParams;

    /* getAvailableSlots.call(params).then((response) => {
      ///setSlots(response as DailyAvailableSlot[]); TODO GET ACTUAL DATA

     
    }); */
    setSlots([
      { start: "09:00", end: "10:00", employee: 5, branch: 1 },
      { start: "11:00", end: "10:00", employee: 5, branch: 1 },
      { start: "12:00", end: "10:00", employee: 5, branch: 1 },
      { start: "13:00", end: "10:00", employee: 5, branch: 1 },
      { start: "15:00", end: "10:00", employee: 5, branch: 1 },
    ] as DailyAvailableSlot[]);
    console.log(slots);
  }, [date, employees, branches, service, duration]);
  return (
    <div className="slots-wrapper">
      {slots.map((slot, index) => (
        <div onClick={() => setSelectedSlot(index)} className="slot-wrapper">
          <SlotCard
            time={slot.start}
            availabilty={true}
            selected={selectedSlot === index ? true : false}
            width="100%"
          />
        </div>
      ))}
    </div>
  );
};

export default AvailableSlots;
