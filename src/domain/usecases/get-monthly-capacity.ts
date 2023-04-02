import {inject, injectable} from "inversify";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {UseCase} from "@quicker/common/use-case";


export interface GetMonthlyCapacityParams extends MonthlyCapacityRequest {
}

@injectable()
export class GetMonthlyCapacityUseCase implements UseCase<GetMonthlyCapacityParams,Promise<MonthlyCapacityResponse>> {
  constructor(
    @inject(CapacityRepository) private readonly capacityRepository: CapacityRepository,
  ) {
  }

  async call(params: GetMonthlyCapacityParams): Promise<MonthlyCapacityResponse> {
    return await this.capacityRepository.getMonthlyCapacity(params);
  }
}
