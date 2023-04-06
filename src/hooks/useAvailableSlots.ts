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
  const [slots, setSlots] = React.useState<DailyAvailableSlot[]>([]);
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
      setSlots(response as DailyAvailableSlot[]);
    });
  }, [dateStr, duration, employees, branches]);

  return slots.filter((slot) => {
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
  });
};
export default useAvailableSlots;
