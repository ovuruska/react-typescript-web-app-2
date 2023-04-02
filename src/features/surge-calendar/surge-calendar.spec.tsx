import SurgeCalendar, {SurgeCalendarProps} from "@features/surge-calendar/surge-calendar";
import {act, fireEvent, render, waitFor} from "@testing-library/react";
import {Provider as InjectionProvider} from "inversify-react";
import {getTestContainer} from "@utils/inversion-container-test";
import {SurgeCalendarTheme} from "@features/surge-calendar/surge-calendar-theme";

const renderWithProvider = (parameters: SurgeCalendarProps) => (<InjectionProvider container={getTestContainer()}>
  <SurgeCalendar {...parameters}/>
</InjectionProvider>)



describe('SurgeCalendar', () => {


  it('should render calendar with empty-styled days.', async () => {
    const date = new Date("2021-01-01");

    const {container, getByTestId} = render(renderWithProvider({initialDate: date, service: "Full Grooming"}));

    const days = container.querySelectorAll(`${SurgeCalendarTheme.styles.empty}`);
    for (let i = 0; i < days.length; i++) {
      expect(days[i]).toHaveTextContent(`${i + 1}`);
      expect(days[i]).toHaveClass(SurgeCalendarTheme.styles.empty);
    }

  });




});
