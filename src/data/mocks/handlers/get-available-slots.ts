import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {rest} from "msw";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";


export const generateAvailableSlotsResponse = (date: Date): DailyAvailableSlotsResponse => {

  const response = [];
  const randomLength = Math.floor(Math.random() * 50);

  for (let i = 0; i < randomLength; i++) {
    const start = `${date}T${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00.000Z`;
    const end = `${date}T${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00.000Z`;
    const employee = Math.floor(Math.random() * 10);
    const branch = Math.floor(Math.random() * 10);

    response.push({
      start, end, employee, branch,
    });
  }
  return response as DailyAvailableSlotsResponse;
}

export const getAvailableSlotsHandler = rest.post(/\/api\/available\/daily/, (req, res, ctx) => {
  const {date} = req.body as MonthlyCapacityRequest;


  const dateObj = new Date(date);
  const response = generateAvailableSlotsResponse(dateObj);

  return res(ctx.status(200), ctx.json(response),);

});
