import React from "react";
import {fireEvent, getByTestId, render,} from "@testing-library/react";
import CustomCalendar from "./custom-calender";

describe("CustomCalendar", () => {
  it("should increment the month from December to January and increment the year", () => {
    const {container, getByTestId} = render(<CustomCalendar date={
      new Date("2023-12-01")
    }/>);

    const arrowRightIcon = container.querySelector(
      "svg[data-testid='arrow-right']"
    ) as HTMLElement;

    fireEvent.click(arrowRightIcon);

    // Expect the new month to be January and the year to be incremented.
    const currentMonth = container.querySelector(
      "h1[data-testid='current-month']"
    ) as HTMLElement;
    expect(currentMonth.textContent).toBe("January");

    const currentYear = container.querySelector(
      "h3[data-testid='current-year']"
    ) as HTMLElement;

    expect(currentYear.textContent).toBe("2024");
  });

  it("should decrement the month from January to December and decrement the year", () => {
    const {container, getByTestId} = render(<CustomCalendar date={
      new Date("2023-01-01")
    }/>);

    const arrowLeftIcon = container.querySelector(
      "svg[data-testid='arrow-left']"
    ) as HTMLElement;
    fireEvent.click(arrowLeftIcon);

    // Expect the new month to be January and the year to be incremented.
    const currentMonth = container.querySelector(
      "h1[data-testid='current-month']"
    ) as HTMLElement;
    expect(currentMonth.textContent).toBe("December");

    const currentYear = container.querySelector(
      "h3[data-testid='current-year']"
    ) as HTMLElement;

    expect(currentYear.textContent).toBe("2022");
  });

  it("should not lose focus when moved from January 31 to February", () => {
    const {container, getByTestId} = render(<CustomCalendar date={
      new Date("2023-01-31")
    }/>);

    const arrowRightIcon = container.querySelector(
      "svg[data-testid='arrow-right']"
    ) as HTMLElement;
    fireEvent.click(arrowRightIcon);

    // Expect the new month to be January and the year to be incremented.
    const activeDate = container.querySelector(
      "div[data-testid='active-date']"
    ) as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("28");
  });

  it("should not lose focus when moved from March 31 to April", () => {
    const {container, getByTestId} = render(<CustomCalendar date={
      new Date("2023-03-31")
    }/>);
    const arrowRightIcon = container.querySelector(
      "svg[data-testid='arrow-right']"
    ) as HTMLElement;
    fireEvent.click(arrowRightIcon);

    const activeDate = container.querySelector(
      "div[data-testid='active-date']"
    ) as HTMLElement;
    expect(activeDate).toBeTruthy();
    expect(activeDate.textContent).toBe("30");

  });


});