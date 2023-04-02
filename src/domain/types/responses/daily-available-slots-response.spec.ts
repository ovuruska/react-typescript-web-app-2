import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";

describe('DailyAvailableSlotsResponse', () => {
  it('should include all fields.', () => {
    const dailyAvailableSlotsResponse: DailyAvailableSlotsResponse = [{
      start: '2020-01-01T00:00:00.000Z',
      end: '2020-01-01T00:00:00.000Z',
      employee: 1,
      branch: 1,

    }];
    expect(dailyAvailableSlotsResponse).toBeDefined();
  });
});
