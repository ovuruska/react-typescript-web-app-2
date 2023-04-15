import { inject, injectable } from 'inversify';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentEntity } from '@domain/types/common/appointment';

@injectable()
export class AppointmentRepositoryImpl implements AppointmentRepository {


  constructor(@inject(AppointmentRemoteDataSource) private remoteDataSource: AppointmentRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  cancelAppointment(id: number): Promise<boolean> {
    return this.remoteDataSource.cancelAppointment(id);
  }

  createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity> {
    return this.remoteDataSource.createAppointment(params);
  }

}
