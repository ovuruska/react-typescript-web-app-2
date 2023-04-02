import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {inject, injectable} from "inversify";
import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";

@injectable()
export class CapacityRemoteDataSourceImpl extends CapacityRemoteDataSource {

  constructor(@inject<ApiUrl>(ApiUrlSymbol) private apiUrl: ApiUrl) {
    super();
  }


  async getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse> {
    const {value} = this.apiUrl;
    const response = await fetch(`${value}api/schedule/capacity/monthly`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(monthlyCapacityRequest),
    });
    const data = await response.json();
    return data as MonthlyCapacityResponse;
  }
}
