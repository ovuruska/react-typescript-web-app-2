import React, { Fragment, useEffect } from "react";
import { useInjection } from "inversify-react";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import {
  GetAvailableSlotsParams,
  GetAvailableSlotsUseCase,
} from "@domain/usecases/available/get-available-slots";
import SlotCard from "@components/book/slot-card/slot-card";
import "./available-slots.css";
import useAvailableSlots from "@hooks/useAvailableSlots";

type AvailableSlotsProps = {
  date: Date;
  employees?: number[];
  branches?: number[];
  onClick?: (slots:DailyAvailableSlot[]) => void;
  service: string;
  duration?: number;
  times?:string[];
};

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
  date,
  employees,
  branches,
  service,
  duration,
  times,
  onClick
}) => {

  const [selectedSlot, setSelectedSlot] = React.useState<number>(-1);

  const slots : DailyAvailableSlot[] = useAvailableSlots({date, employees, branches, service, duration, times});

  const formatSlot = (slot: DailyAvailableSlot) => {
    const start = new Date(slot.start);
    if(start.getMinutes() === 0) {
      return `${start.getHours()}:00`;
    }
    return `${start.getHours()}:${start.getMinutes()}`;
  }

  const sortAndGetUniqueSlots = (slots: DailyAvailableSlot[]) => {
    const sortedSlots = slots.sort((a, b) => {
      const aDate = new Date(a.start);
      const bDate = new Date(b.start);
      return aDate.getTime() - bDate.getTime();
    });
    const set = new Set(sortedSlots.map((slot) => formatSlot(slot))).values();
    return Array.from(set);
  }

  return (
    <div className="slots-wrapper">
      {sortAndGetUniqueSlots(slots).map((slot,index) => (
        <div key={slot} onClick={() => handleClick(slot,index)} className="slot-wrapper">
          <SlotCard

            time={slot}
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
