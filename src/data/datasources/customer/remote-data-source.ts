import {injectable} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import {RemoteDataSource} from "@data/datasources/remote-data-source";
import { LoginRequest } from '@domain/types/requests/login';
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { SignupRequest } from '@domain/types/requests/signup';



@injectable()
export abstract class CustomerRemoteDataSource extends RemoteDataSource {
  abstract getMe(): Promise<MeResponse>;

  abstract login(request: LoginRequest): Promise<AuthenticationResponse>;

  abstract signup(request: SignupRequest): Promise<AuthenticationResponse>;

}
