/*
import { PetEntity } from '../common/pet';
import {faker}  from '@faker-js/faker';
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import { injectable } from 'inversify';

@injectable()
export class PetMockGenerator extends MockGenerator<PetEntity>{
  generateMany(count: number): PetEntity[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): PetEntity {
    return {
      id: faker.datatype.number(),
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
      name: faker.name.firstName(),
      breed: faker.name.jobTitle(),
      age: faker.datatype.number(),
      weight: faker.datatype.number(),
      description: faker.lorem.paragraph(),
      rabies_vaccination: faker.date.past().toString(),
      employee_notes: faker.lorem.paragraph(),
      customer_notes: faker.lorem.paragraph(),
      special_handling: faker.datatype.boolean(),
      coat_type: faker.name.jobTitle(),
      owner: faker.datatype.number(),
    } as PetEntity;
  }

}

 */

import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';

describe('PetMockGenerator', () => {
  it('should be defined.',()=>{
    expect(PetMockGenerator).toBeDefined();
  });
  it('should be able to generate a single pet.',()=>{
    const petMockGenerator = new PetMockGenerator();
    const pet = petMockGenerator.generateOne();
    expect(pet).toBeDefined();
  });

  it('should be able to generate many pets.',()=>{
    const petMockGenerator = new PetMockGenerator();
    const pets = petMockGenerator.generateMany(5);
    expect(pets).toBeDefined();
    expect(pets.length).toBe(5);
  });
});