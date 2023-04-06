import React, { useEffect } from "react";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import {
  GetAvailableSlotsParams,
  GetAvailableSlotsUseCase,
} from "@domain/usecases/available/get-available-slots";
import { useInjection } from "inversify-react";

export interface AvailableSlotsParams {
  date?: Date;
  duration?: number;
  service?: string;
  branches?: number[];
  employees?: number[];
  times?: string[];
}

const useAvailableSlots = ({
  date = new Date(),
  duration = 60,
  service = "Full Grooming",
  branches,
  employees,
  times = ["morning", "afternoon", "evening"],
}: AvailableSlotsParams) => {
  const [slots, setSlots] = React.useState<string[]>([]);
  const getAvailableSlots = useInjection(GetAvailableSlotsUseCase);
  const dateStr = date.toISOString().split("T")[0];

  useEffect(() => {
    if (service === "Grooming") service = "Full Grooming";
    else if (service === "WeWash") service = "We Wash";

    const params = {
      date: dateStr,
      employees: employees ?? [],
      branches: branches ?? [],
      service,
      duration,
    } as GetAvailableSlotsParams;
    getAvailableSlots.call(params).then((response) => {
      setSlots(
        sortAndGetUniqueSlots(
          response.filter((slot) => {
            const date = new Date(slot.start);
            const dateHour: number = date.getHours();
            if (times?.includes("morning")) {
              return dateHour >= 8 && dateHour <= 12;
            }
            if (times?.includes("afternoon")) {
              return dateHour >= 12 && dateHour <= 16;
            }
            if (times?.includes("evening")) {
              return dateHour >= 16 && dateHour <= 20;
            }
            return false;
          })
        )
      );
      console.log(slots);
    });
  }, [dateStr, duration, employees, branches]);

  const formatSlot = (slot: DailyAvailableSlot) => {
    const start = new Date(slot.start);
    if (start.getMinutes() === 0) {
      return `${start.getHours()}:00`;
    }
    return `${start.getHours()}:${start.getMinutes()}`;
  };

  const sortAndGetUniqueSlots = (slots: DailyAvailableSlot[]) => {
    const sortedSlots = slots.sort((a, b) => {
      const aDate = new Date(a.start);
      const bDate = new Date(b.start);
      return aDate.getTime() - bDate.getTime();
    });
    const set = new Set(sortedSlots.map((slot) => formatSlot(slot))).values();
    return Array.from(set);
  };

  return {
    slots,
    setSlots,
  };
};
export default useAvailableSlots;
