import {injectable} from "inversify";
import {CustomerRepository} from "@domain/repositories/customer";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {inject} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { LoginRequest } from '@domain/types/requests/login';
import { SignupRequest } from '@domain/types/requests/signup';

@injectable()
export class CustomerRepositoryImpl implements CustomerRepository{

  constructor(@inject<CustomerRemoteDataSource>(CustomerRemoteDataSource) private remoteDataSource: CustomerRemoteDataSource) {
  }

  async getMe(): Promise<MeResponse> {
    return await this.remoteDataSource.getMe();
  }

  async login(request: LoginRequest): Promise<AuthenticationResponse> {
    return await this.remoteDataSource.login(request);
  }

  async signup(request: SignupRequest): Promise<AuthenticationResponse> {
    return await this.remoteDataSource.signup(request);
  }

}
