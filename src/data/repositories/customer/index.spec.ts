import { CustomerRepositoryImpl } from '@data/repositories/customer/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CustomerRepository } from '@domain/repositories/customer';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import mockAxios from 'jest-mock-axios';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';

const appointmentGenerator = new AppointmentMockGenerator();

describe('CustomerRepositoryImpl', () => {

  let container: Container;
  let customerRepository: CustomerRepositoryImpl;

  const meGenerator = new MeMockGenerator();
  const authGenerator = new AuthenticationResponseMockGenerator();

  beforeAll(() => {
    container = getTestContainer();
    customerRepository = container.get(CustomerRepository) as CustomerRepositoryImpl;
  });

  it('should be defined', () => {
    expect(CustomerRepositoryImpl).toBeDefined();
    expect(customerRepository).toBeDefined();
  });

  it('should get me response.', async () => {
    const me = meGenerator.generateOne();

    mockAxios.get.mockResolvedValue({ data: me });
    const result = await customerRepository.getMe();
    expect(result).toEqual(me);

  });
  it('should login successfully', async () => {
    const auth = authGenerator.generateOne();
    mockAxios.post.mockResolvedValue({ data: auth });
    const result = await customerRepository.login({
      email: 'a', password: 'a',
    });
    expect(result).toEqual(auth);
  });
  it('should signup successfully', async () => {
    const auth = authGenerator.generateOne();
    mockAxios.post.mockResolvedValue({ data: auth });
    const result = await customerRepository.signup({
      first_name: 'a', last_name: 'a', email: 'a', password: 'a',
    });
    expect(result).toEqual(auth);
  });
  it('should get upcoming appointments successfully', async () => {
    const appointments = appointmentGenerator.generateMany(10);

    mockAxios.get.mockResolvedValue({
      data: {
        results: appointments, count: 10, next: null, previous: null,
      },
    });
    const result = await customerRepository.upcomingAppointments({
      offset: 0, limit: 10,
    });
    expect(result.results).toEqual(appointments);
  });
  it('should get past appointments successfully', async () => {
    const appointments = appointmentGenerator.generateMany(10);

    mockAxios.get.mockResolvedValue({
      data: {
        results: appointments, count: 10, next: null, previous: null,
      },
    });
    const result = await customerRepository.pastAppointments({
      offset: 0, limit: 10,
    });
    expect(result.results).toEqual(appointments);
  });
  it('should get all appointments successfully', async () => {
    const appointments = appointmentGenerator.generateMany(10);

    mockAxios.get.mockResolvedValue({
      data: {
        results: appointments, count: 10, next: null, previous: null,
      },
    });
    const result = await customerRepository.allAppointments({
      offset: 0, limit: 10,
    });
    expect(result.results).toEqual(appointments);
  });


});
