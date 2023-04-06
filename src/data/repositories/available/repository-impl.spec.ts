/*
# capacity-repository-impl.spec.ts
import {CapacityRepositoryImpl} from "@data/repositories/capacity-repository-impl";
import {getTestContainer} from "@utils/inversion-container-test";
import {interfaces} from "inversify";
import Container = interfaces.Container;
import {
  CapacityRemoteDataSource,
} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceMock} from "@data/datasources/capacity/capacity-remote-data-source-__mock__";
import {CapacityRepository} from "@domain/repositories/capacity-repository";

describe('CapacityRepositoryImpl', () => {
  let container: Container;
  let availableRepository: CapacityRepositoryImpl;
  beforeAll(() => {
    container = getTestContainer();
    container.rebind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceMock);
    availableRepository = container.get<CapacityRepository>(CapacityRepository) as  CapacityRepositoryImpl;
  });

  it('should be defined', () => {
    expect(CapacityRepositoryImpl).toBeDefined();
  });

  it('should return valid results for february.', async() => {
    const monthlyCapacityRequest = {
      date:'02/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(28);

  });

  it('should return valid results for january.', async() => {
    const monthlyCapacityRequest = {
      date:'01/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(31);

  });

  it('should return valid results for april.', async() => {
    const monthlyCapacityRequest = {
      date:'04/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(30);

  });


});

# available-repository-impl.ts
import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {inject, injectable} from "inversify";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";

@injectable()
export class RepositoryImpl implements AvailableRepository {

  constructor(@inject(AvailableRemoteDataSource) private remoteDataSource: AvailableRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getDailySlots(monthlyCapacityRequest: DailyAvailableSlotsRequest): Promise<DailyAvailableSlotsResponse> {
    return await this.remoteDataSource.getDailySlots(monthlyCapacityRequest);
  }

}
*/

import {AvailableRepositoryImpl} from "@data/repositories/available/repository-impl";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import mockAxios from "jest-mock-axios";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {EmployeeEntity} from "@domain/types/common/employee";
import {BranchEntity} from "@domain/types/common/branch";

describe('AvailableRepositoryImpl', () => {

  let availableRepository: AvailableRepositoryImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    availableRepository = container.get(AvailableRepository) as AvailableRepositoryImpl;
  });

  it('should be defined', () => {
    expect(AvailableRepositoryImpl).toBeDefined();
  });

  it('should return valid daily slots for date.', async () => {
    const dailyAvailableSlotsRequest = {
      date: '2021-02-01', service: 'We Wash'
    } as DailyAvailableSlotsRequest;

    const employee = {
      id: 3,
      name: `Employee 3`,

    } as EmployeeEntity;

    const branch = {
      id: 3,
      name: `Branch 3`,
      address: `Address 3`,
      phone: `Phone 3`,
      email: `Email 3`,
    } as BranchEntity;

    const mockResponse: DailyAvailableSlotsResponse = [
      {
        start: '08:00',
        end: '08:30',
        employee,
        branch,
      },
      {
        start: '08:30',
        end: '09:00',
        employee,
        branch,
      }
    ];

    mockAxios.post.mockResolvedValue(mockResponse);

    await availableRepository.getDailySlots(dailyAvailableSlotsRequest);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/available/daily', dailyAvailableSlotsRequest,undefined);
  });
});
