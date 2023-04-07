import {injectable} from "inversify";
import {CustomerRepository} from "@domain/repositories/customer-repository";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {inject} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";

@injectable()
export class CustomerRepositoryImpl implements CustomerRepository{

  constructor(@inject<CustomerRemoteDataSource>(CustomerRemoteDataSource) private remoteDataSource: CustomerRemoteDataSource) {
  }

  async getMe(): Promise<MeResponse> {
    return await this.remoteDataSource.getMe();
  }

}
