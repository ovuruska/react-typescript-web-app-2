import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import mockAxios from "jest-mock-axios";

describe('AvailableRemoteDataSourceImpl', () => {
  let availableRemoteDataSourceImpl: AvailableRemoteDataSourceImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    availableRemoteDataSourceImpl = container.get(
      AvailableRemoteDataSource
    ) as AvailableRemoteDataSourceImpl;
  });



  it('should fetch daily slots successfully', async () => {
    const dailyAvailableSlotsRequest: DailyAvailableSlotsRequest = {
      employees: [1, 2, 3],
      branches: [1, 2, 3],
      service: 'service',
      date: '01/2023',
    };

    const mockResponse: DailyAvailableSlotsResponse = [
      {
        start: '08:00',
        end: '08:30',
        employee: 3,
        branch: 3,
          },
      {
        start: '08:30',
        end: '09:00',
        employee: 3,
        branch: 3,
      }
    ];
    mockAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await availableRemoteDataSourceImpl.getDailySlots(
      dailyAvailableSlotsRequest
    );
    expect(mockAxios.post).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/available/daily', dailyAvailableSlotsRequest,undefined);
  });
});
