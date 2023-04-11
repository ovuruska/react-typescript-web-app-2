import {MeResponse} from "@domain/types/responses/me-response";
import {injectable} from "inversify";
import { LoginRequest } from '@domain/types/requests/login';
import { SignupRequest } from '@domain/types/requests/signup';
import { AuthenticationResponse } from '@domain/types/responses/authentication';

@injectable()
export abstract class CustomerRepository{
  abstract getMe(): Promise<MeResponse>;

  abstract login(request: LoginRequest): Promise<AuthenticationResponse>;

  abstract signup(request: SignupRequest): Promise<AuthenticationResponse>;
}
