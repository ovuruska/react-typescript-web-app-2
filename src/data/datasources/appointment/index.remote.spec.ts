/*
import { injectable } from 'inversify';
import { RemoteDataSource } from '@data/datasources/remote-data-source';
import { AppointmentEntity } from '@domain/types/common/appointment';

@injectable()
abstract class AppointmentRemoteDataSource extends RemoteDataSource{

  abstract createAppointment(): Promise<AppointmentEntity>;

  abstract cancelAppointment(): Promise<boolean>;
}
 */

import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';

describe('AppointmentRemoteDataSource', () => {
  it('should be defined', () => {
    expect(AppointmentRemoteDataSource).toBeDefined();
  });
});
