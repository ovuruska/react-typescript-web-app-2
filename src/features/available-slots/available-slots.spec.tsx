import React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AvailableSlots, { AvailableSlotsProps } from "./available-slots";
import { DailyAvailableSlot } from "@domain/types/responses/daily-available-slots-response";
import {DailyAvailableSlotMockGenerator} from "@domain/types/__mock__/daily-available-slot-generator";

const slotGenerator = new DailyAvailableSlotMockGenerator();

const mockSlots: DailyAvailableSlot[] = slotGenerator.generateMany(3);

jest.mock("@hooks/useAvailableSlots", () => ({
  __esModule: true,
  default: () => mockSlots,
}));

const defaultProps: AvailableSlotsProps = {
  date: new Date("2023-04-10"),
  service: "service1",
  onSelect: jest.fn(),
};

const formatSlot = (slot: DailyAvailableSlot) => {
  const start = new Date(slot.start);
  return `start.getMinutes() === 0 ? ${start.getHours()}:00 : ${start.getHours()}:${start.getMinutes()}`;
};

const getHours = (slots: DailyAvailableSlot[]) => {
  const uniqueSlots = slots.filter((slot) => {
    const start = new Date(slot.start);
    const dateHour = start.getHours();
    return !(dateHour < 8 || dateHour > 20);

  })
    .map(formatSlot)
  return Array.from(new Set(uniqueSlots));
}

describe("AvailableSlots", () => {
  it("renders available slots correctly", () => {
    const {getAllByTestId} = render(<AvailableSlots {...defaultProps} />);

    const slotCards = getAllByTestId("available-slot-card");

    const hours = getHours(mockSlots);

    expect(slotCards).toHaveLength(hours.length);
    slotCards.forEach((slotCard, index) => {
      expect(slotCard).toHaveTextContent(hours[index]);
    });
  });

  it("opens the drawer and displays selected slots when a slot is clicked", async () => {
    const {getAllByTestId,getByTestId} = render(<AvailableSlots {...defaultProps} />);

    const slotCards = getAllByTestId("available-slot-card");
    act(() => {
      fireEvent.click(slotCards[0]);

    });
    const hours = getHours(mockSlots);

    const text  = getByTestId("available-slots-text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(hours[0]);
  });


});
