import {inject, injectable} from "inversify";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {
  CapacityRemoteDataSource
} from "@data/datasources/capacity/capacity-remote-data-source";

@injectable()
export class CapacityRepositoryImpl extends CapacityRepository {

  constructor(@inject<CapacityRemoteDataSource>(CapacityRemoteDataSource) private dataSource: CapacityRemoteDataSource) {
    super();
  }


  async getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse> {
    return await this.dataSource.getMonthlyCapacity(monthlyCapacityRequest);

  }

}
