import {GetMonthlyCapacityParams, GetMonthlyCapacityUseCase} from "@domain/usecases/get-monthly-capacity";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {
  getMonthlyCapacityResponse,
  setAfternoonCapacity,
  setMorningCapacity
} from "@data/mocks/handlers/get-monthly-capacity";
import fetchMock from "jest-fetch-mock";

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
    setMorningCapacity(0);
    setAfternoonCapacity(0);
    const date = new Date(2023,0,1)
    const response = getMonthlyCapacityResponse(date);

    fetchMock.mockResponse(
      JSON.stringify(response
    ));

    const result = await useCase.call(params);
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(31);

  });
});
