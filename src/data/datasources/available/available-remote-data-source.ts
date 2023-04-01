import {RemoteDataSource} from "@data/datasources/remote-data-source";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";


export abstract class AvailableRemoteDataSource extends RemoteDataSource {
  abstract getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse>;
}

export const AvailableRemoteDataSourceSymbol = Symbol.for('AvailableRemoteDataSource');
