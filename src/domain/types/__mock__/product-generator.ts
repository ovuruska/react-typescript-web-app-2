/*
export interface ProductEntity {
  id: number;
  created_at: string;
  name: string;
  description: string;
  cost: number;
  updated_at: string;
  category: string;
  sub_category: string;
}

 */

import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { ProductEntity } from '@domain/types/common/product';
import { faker } from '@faker-js/faker';

class ProductMockGenerator extends MockGenerator<ProductEntity>{
  generateMany(count:number): ProductEntity[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): ProductEntity {
    return {
      id:faker.datatype.number(),
      created_at:faker.date.past().toString(),
      name:faker.name.firstName(),
      description:faker.name.jobTitle(),
      cost:faker.datatype.number(),
      updated_at:faker.date.past().toString(),
      category:faker.name.jobTitle(),
      sub_category:faker.name.jobTitle(),

    };
  }

}

export default ProductMockGenerator;
