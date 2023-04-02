/*
import {inject, injectable} from "inversify";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";


export interface GetMonthlyCapacityParams extends MonthlyCapacityRequest {
}

@injectable()
export class GetMonthlyCapacityUseCase {
  constructor(
    @inject(CapacityRepository) private readonly capacityRepository: CapacityRepository,
  ) {
  }

  async call(params: GetMonthlyCapacityParams): Promise<MonthlyCapacityResponse> {
    return await this.capacityRepository.getMonthlyCapacity(params);
  }
}
export interface MonthlyCapacityRequest {
  employees?: number[];
  branches?: number[];
  service: string;
  date: string;
}


 */

import {GetMonthlyCapacityParams, GetMonthlyCapacityUseCase} from "@domain/usecases/get-monthly-capacity";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";

describe('GetMonthlyCapacityUseCase', () => {

  let useCase: GetMonthlyCapacityUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(GetMonthlyCapacityUseCase);
  });

  it('should return the monthly capacity', async () => {
    const params : GetMonthlyCapacityParams = {
      employees: [1, 2, 3],
      branches: [1, 2, 3],
      service: "service",
      date: "01/2023",

    };
    const result = await useCase.call(params);
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(31);

  });
});
