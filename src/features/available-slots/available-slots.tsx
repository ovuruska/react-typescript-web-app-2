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
  onClick?: (slots: DailyAvailableSlot[]) => void;
  service: string;
  duration?: number;
  times?: string[];
};

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
  date,
  employees,
  branches,
  service,
  duration,
  times,
  onClick,
}) => {
  const [selectedSlot, setSelectedSlot] = React.useState<number>(-1);
  const [slotTimes, setSlotTimes] = React.useState<string[]>([]);

  const { slots, setSlots } = useAvailableSlots({
    date,
    employees,
    branches,
    service,
    duration,
    times,
  });

  useEffect(() => {
    console.log(employees);
  }, [slots]);

  return (
    <div className="slots-wrapper">
      {slots.map((slot, index) => (
        <div
          key={index}
          onClick={() => setSelectedSlot(index)}
          className="slot-wrapper"
        >
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
