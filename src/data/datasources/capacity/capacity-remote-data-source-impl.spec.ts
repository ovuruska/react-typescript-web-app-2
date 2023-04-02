import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import fetchMock from "jest-fetch-mock";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";


describe("CapacityRemoteDataSourceImpl", () => {
  let capacityRemoteDataSourceImpl: CapacityRemoteDataSourceImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    container.rebind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
    capacityRemoteDataSourceImpl = container.get(CapacityRemoteDataSource) as CapacityRemoteDataSourceImpl;
  });

  beforeEach(() => {
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch monthly capacity successfully", async () => {

    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      employees: [1, 2, 3], branches: [1, 2, 3], service: "service", date: "01/2023",
    };

    const mockResponse: MonthlyCapacityResponse = [{
      date: "2023-01-01", morning_capacity: 10, afternoon_capacity: 10,
    }];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await capacityRemoteDataSourceImpl.getMonthlyCapacity(monthlyCapacityRequest);
    const lastCall = fetchMock.mock.calls[0];
    expect(lastCall).toBeTruthy();
    expect(lastCall.length).toEqual(2);
    const [url, options] = lastCall;
    expect(url).toEqual("http://localhost:8080/api/schedule/capacity/monthly");
    expect(result).toEqual(mockResponse);

  });


});
