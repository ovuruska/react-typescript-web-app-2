import React from "react";
import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import SlotCard from "@components/book/slot-card/slot-card";
import "./available-slots.css";
import useAvailableSlots from "@hooks/useAvailableSlots";
import AvailableSlotsDrawer from "@features/available-slots/available-slots-drawer";

type AvailableSlotsProps = {
  date: Date;
  employees?: number[];
  branches?: number[];
  onClick?: () => void;
  service: string;
  duration?: number;
  times?: string[];
  onSelect?: (slot: DailyAvailableSlot) => void;

};

const AvailableSlots: React.FC<AvailableSlotsProps> = ({
                                                         date,
  onSelect,
                                                         employees,
                                                         branches,
                                                         service,
                                                         duration,
                                                         times = ["morning", "afternoon", "evening"],
                                                         onClick
                                                       }) => {

  const [selectedSlots, setSelectedSlots] = React.useState<DailyAvailableSlot[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = React.useState<string>("");

  const slots: DailyAvailableSlot[] = useAvailableSlots({date, employees, branches, service, duration});

  const formatSlot = (slot: DailyAvailableSlot) => {
    const start = new Date(slot.start);
    if (start.getMinutes() === 0) {
      return `${start.getHours()}:00`;
    }
    return `${start.getHours()}:${start.getMinutes()}`;
  }

  const getAvailableSlots = (slots: DailyAvailableSlot[]) => {
    const sortedSlots = slots.sort((a, b) => {
      const aDate = new Date(a.start);
      const bDate = new Date(b.start);
      return aDate.getTime() - bDate.getTime();
    });
    return sortedSlots.filter((slot, index) => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      const dateHour = start.getHours();
      if (times?.includes("morning") && dateHour >= 8 && dateHour <= 12) {
        return true;
      }
      if (times?.includes("afternoon") && dateHour >= 12 && dateHour <= 17) {
        return true;
      }
      if (times?.includes("evening") && dateHour >= 17 && dateHour <= 20) {
        return true;

      }
      return false;
    });

  }

  const getSlotStrings = (slots: DailyAvailableSlot[]) => {
    const slotStrings = slots.map((slot) => formatSlot(slot));
    const set = new Set(slotStrings);
    return Array.from(set);
  }

  const handleClick = (hour: string, index: number) => {
    const slotsForHour = slots.filter((slot) => formatSlot(slot) === hour);
    setDrawerOpen(true);
    setSelectedSlots(slotsForHour);
    setTimeOfDay(hour);
  }
  const filteredSlots = getAvailableSlots(slots);

  return (<div className="slots-wrapper">
    {getSlotStrings(filteredSlots).map((hour, index) => (
      <div key={hour} onClick={() => handleClick(hour, index)} className="slot-wrapper">
        <SlotCard

          time={hour}
          availabilty={true}
          width="100%"
        />
      </div>))}
    <AvailableSlotsDrawer onSelect={onSelect} timeOfDay={timeOfDay} slots={selectedSlots} setOpen={setDrawerOpen}
                          open={drawerOpen}/>
  </div>);
};

export default AvailableSlots;
