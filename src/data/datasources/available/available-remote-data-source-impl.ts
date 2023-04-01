import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {AvailableRemoteDataSource} from "@data/datasources/available/available-remote-data-source";
import {inject, injectable} from "inversify";
import {ApiUrlSymbol} from "@domain/types/symbols/api-url";

@injectable()
export class AvailableRemoteDataSourceImpl extends AvailableRemoteDataSource {

  constructor(@inject(ApiUrlSymbol) private apiUrl: string) {
    super();
  }


  async getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse> {
    const response = await fetch(`${this.apiUrl}/api/schedule/capacity/monthly`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(monthlyCapacityRequest),
    });
    const data = await response.json();
    return data as MonthlyCapacityResponse;
  }
}
