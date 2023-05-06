import {injectable} from "inversify";
import {CustomerRepository} from "@domain/repositories/customer";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {inject} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { LoginRequest } from '@domain/types/requests/login';
import { SignupRequest } from '@domain/types/requests/signup';
import { OffsetRequest } from '@domain/types/requests/offset';
import { OffsetResponse } from '@domain/types/responses/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';

@injectable()
export class CustomerRepositoryImpl implements CustomerRepository{

  constructor( @inject<CustomerRemoteDataSource>(CustomerRemoteDataSource) private remoteDataSource: CustomerRemoteDataSource,
    @inject<CustomerLocalDataSource>(CustomerLocalDataSource) private localDataSource: CustomerLocalDataSource){}

  async getMe(): Promise<MeResponse> {
    const localResponse = await this.localDataSource.me();
    if(localResponse){
      return localResponse;
    }else {
      const response = await this.remoteDataSource.getMe();
      this.localDataSource.me(response);
      return response;
    }
  }

  async login(request: LoginRequest): Promise<AuthenticationResponse> {
    const response = await this.remoteDataSource.login(request);
    const {profile,token} = response;
    if(profile){
      this.localDataSource.me(profile);
    }
    return response;
  }

  async signup(request: SignupRequest): Promise<AuthenticationResponse> {
    const response = await this.remoteDataSource.signup(request);
    const {profile} = response;
    if(profile){
      this.localDataSource.me(profile);
    }
    return response;
  }

  async upcomingAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const localResponse = await this.localDataSource.upcomingAppointments(request);
    const response = this.remoteDataSource.upcomingAppointments(request).then((remoteResponse) => {
      const {count, results} = remoteResponse;
      if(count > 0){
        this.localDataSource.addAppointments(results);
      }
      return remoteResponse;

    });
    if(localResponse.count > 0){
      return localResponse;

    }
    return await response;
  }

  async pastAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const localResponse = await this.localDataSource.pastAppointments(request);
    const response = this.remoteDataSource.pastAppointments(request).then((remoteResponse) => {
      const {count, results} = remoteResponse;
      if(count > 0){
        this.localDataSource.addAppointments(results);
      }
      return remoteResponse;

    });
    if(localResponse.count > 0){
      return localResponse;
    }
    return await response;
  }

  async allAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const localResponse = await this.localDataSource.allAppointments(request);
    const response = this.remoteDataSource.allAppointments(request).then((remoteResponse) => {
      const {count, results} = remoteResponse;
      if(count > 0){
        this.localDataSource.addAppointments(results);
      }
      return remoteResponse;
    });
    if(localResponse.count > 0){
      return localResponse;
    }
    return await response;
  }

  async allPets(): Promise<PetDetailsEntity[]> {
    const localResponse = await this.localDataSource.allPets();
    const response = this.remoteDataSource.allPets().then((remoteResponse) => {
      if(remoteResponse.length > 0){
        this.localDataSource.addPets(remoteResponse);
      }
      return remoteResponse;

    });
    if(localResponse.length > 0){
      return localResponse;
    }
    return await response;
  }

  async createPet(request:CreatePetRequest): Promise<PetDetailsEntity> {
    const response =await this.remoteDataSource.createPet(request);
    this.localDataSource.createPet(response);
    return response;
  }

}
