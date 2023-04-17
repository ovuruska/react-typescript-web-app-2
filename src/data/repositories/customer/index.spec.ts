import { CustomerRepositoryImpl } from '@data/repositories/customer/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CustomerRepository } from '@domain/repositories/customer';
import { MeMockGenerator } from '@domain/types/__mock__/me-generator';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import mockAxios from 'jest-mock-axios';
import { AppointmentMockGenerator } from '@domain/types/__mock__/appointment';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';

const appointmentGenerator = new AppointmentMockGenerator();

describe('CustomerRepositoryImpl', () => {

  let container: Container;
  let customerRepository: CustomerRepositoryImpl;

  const meGenerator = new MeMockGenerator();
  const authGenerator = new AuthenticationResponseMockGenerator();
  const petDetailsMockGenerator = new PetDetailsMockGenerator();

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

  it('should get all pets successfully', async () => {
   const data = petDetailsMockGenerator.generateMany(10);
    mockAxios.get.mockResolvedValue({data});
    const result = await customerRepository.allPets();
    expect(result).toEqual(data);
  });

  it('should create pet successfully', async () => {
    const data = petDetailsMockGenerator.generateOne();
    mockAxios.post.mockResolvedValue({data});
    const request = {
      name: 'a',
      breed: 'a',
      gender:"Male",
      age: 1,
      weight: 1,
    } as CreatePetRequest;
    const result = await customerRepository.createPet(request);
    expect(result).toEqual(data);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/customer/pet/create', request, undefined);
  });

});
