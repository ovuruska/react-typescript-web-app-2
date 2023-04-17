import { AppointmentRepositoryImpl } from '@data/repositories/appointment/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import mockAxios from 'jest-mock-axios';


const appointmentGenerator = new AppointmentMockGenerator();
const appointmentData = appointmentGenerator.generateOne();

describe('AppointmentRepositoryImpl', () => {
  let appointmentRepositoryImpl: AppointmentRepositoryImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    appointmentRepositoryImpl = container.get(AppointmentRepository) as AppointmentRepositoryImpl;
  });

  it('should be defined', () => {
    expect(appointmentRepositoryImpl).toBeDefined();
  });
  it('should post to /api/customer/appointment/create when createAppointment is called.', async () => {
    const params = {
      pet: 1,
      start: '2021-01-01T00:00:00.000Z',
      branch: 1,
      employee: 1,
      customer_notes: 'test'

    } as CreateAppointmentRequest;

    mockAxios.post.mockResolvedValue({ data: appointmentData })
    const response = await appointmentRepositoryImpl.createAppointment(params);

    expect(response).toEqual(appointmentData);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/customer/appointment/create', params,undefined);

  });
  it('should post to /api/customer/appointment/cancel/:id when cancelAppointment is called.', async () => {
    const id = 1;
    mockAxios.post.mockResolvedValue({ status: 200 });
    const response = await appointmentRepositoryImpl.cancelAppointment(id);

    expect(response).toEqual(true);
    expect(mockAxios.post).toHaveBeenCalledWith(`/api/customer/appointment/cancel/${id}`,undefined,undefined);
  });

});
