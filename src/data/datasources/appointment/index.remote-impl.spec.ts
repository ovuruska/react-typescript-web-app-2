/*
import { inject, injectable } from 'inversify';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

@injectable()
export class AppointmentRemoteDataSourceImpl implements AppointmentRemoteDataSource {

  constructor(@inject<HttpClient>(HttpClientSymbol) private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity> {
    const response = await this.httpClient.post<CreateAppointmentRequest, AppointmentEntity>('/api/appointment/create', params);
    return response.data as AppointmentEntity;
  }

  async cancelAppointment(id: number): Promise<boolean> {
    const response = await this.httpClient.post(`/api/appointment/cancel/${id}`);
    return response.status === 200;
  }
}

 */

/*
export interface CreateAppointmentRequest {
  pet: number;
  start: string;
  branch: number;
  employee?: number;
  customer_notes?: string;

}

 */

import { AppointmentRemoteDataSourceImpl } from '@data/datasources/appointment/index.remote-impl';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import mockAxios from 'jest-mock-axios';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

const appointmentDataGenerator = new AppointmentMockGenerator();
const appointmentData = appointmentDataGenerator.generateOne();

describe('AppointmentRemoteDataSourceImpl', () => {
  let appointmentRemoteDataSourceImpl: AppointmentRemoteDataSource;
  let container : Container;
  beforeAll(() => {
    container = getTestContainer();
    appointmentRemoteDataSourceImpl = container.get<AppointmentRemoteDataSource>(AppointmentRemoteDataSource);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be defined', () => {
    expect(appointmentRemoteDataSourceImpl).toBeDefined();
  });

  it('cancelAppointment returns correct response when status is 200.', async () => {
    mockAxios.post.mockResolvedValue({ status: 200,data:{} });
    const response = await appointmentRemoteDataSourceImpl.cancelAppointment(1);
    expect(response).toBe(true);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/appointment/cancel/1', undefined, undefined);

  });

  it('cancelAppointment returns correct response when status is 400.', async () => {
    mockAxios.post.mockResolvedValue({ status: 400,data:{} });
    const response = await appointmentRemoteDataSourceImpl.cancelAppointment(1);
    expect(response).toBe(false);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/appointment/cancel/1', undefined, undefined);
  });
  it('cancelAppointment returns correct response when status is 404.', async () => {
    mockAxios.post.mockResolvedValue({ status: 404,data:{} });
    const response = await appointmentRemoteDataSourceImpl.cancelAppointment(1);
    expect(response).toBe(false);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/appointment/cancel/1', undefined, undefined);
  });

  it('createAppointment returns correct response when given valid params.', async () => {
    const params = {
      start: new Date().toISOString(),
      branch: 1,
      pet: 1,
      employee: 1,
      customer_notes: 'test',
    };
    mockAxios.post.mockResolvedValue({ status: 200,data:appointmentData });
    const response = await appointmentRemoteDataSourceImpl.createAppointment(params as CreateAppointmentRequest);
    expect(response).toEqual(appointmentData);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/appointment/create', params, undefined);

  });




});
