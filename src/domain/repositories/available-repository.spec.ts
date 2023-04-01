

/*
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";


export abstract class AvailableRepository {

  abstract getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse>;
}

 */

import {AvailableRepository} from "@domain/repositories/available-repository";

describe('AvailableRepository', () => {
  it('should be defined.', () => {
    expect(AvailableRepository).toBeDefined();
  });

});
