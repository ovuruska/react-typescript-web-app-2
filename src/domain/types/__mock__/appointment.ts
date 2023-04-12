import {injectable} from 'inversify';
import { faker } from '@faker-js/faker';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';

const petMockGenerator = new PetMockGenerator();
const productMockGenerator = new ProductMockGenerator();
const branchMockGenerator = new BranchMockGenerator();
const employeeMockGenerator = new EmployeeMockGenerator();

@injectable()
export class AppointmentMockGenerator extends MockGenerator<AppointmentEntity> {
  generateMany(count: number): AppointmentEntity[] {
    // Generate count elements
    return new Array(count).fill(null).map((_, id) => this.generateOne(id));
  }

  generateOne(id?: number): AppointmentEntity {
    return {
      id: id ?? faker.datatype.number(),
      start: faker.date.past().toString(),
      end: faker.date.past().toString(),
      customer_notes: faker.lorem.paragraph(),
      tip: faker.datatype.number(),
      cost: faker.datatype.number(),
      status: faker.lorem.word(),
      appointment_type: faker.lorem.word(),
      products: productMockGenerator.generateMany(faker.datatype.number({
        min: 0,
        max:5
      })),
      branch: branchMockGenerator.generateOne(),
      employee: employeeMockGenerator.generateOne(),
      pet: petMockGenerator.generateOne(),
    } as AppointmentEntity;
  }
}
