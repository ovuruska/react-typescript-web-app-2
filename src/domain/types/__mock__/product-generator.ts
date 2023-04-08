import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { ProductEntity } from '@domain/types/common/product';
import { faker } from '@faker-js/faker';

const categories : {
  [key: string]: string[];
} = {
  "Medicated shampoos": [
    "Anti-fungal shampoos",
    "Anti-bacterial shampoos",
    "Anti-itch shampoos",
    "Anti-dandruff shampoos",
    "Hypoallergenic shampoos",
    "Shampoos for sensitive skin"
  ],
  "Flea and tick shampoos": [
    "Flea-repelling shampoos",
    "Tick-repelling shampoos",
    "Flea and tick treatment shampoos"
  ],
  "Coat-specific shampoos": [
    "Shampoos for long-haired dogs",
    "Shampoos for short-haired dogs",
    "Shampoos for curly-haired dogs",
    "Shampoos for wire-haired dogs",
    "Shampoos for double-coated dogs"
  ],
  "Color-enhancing shampoos": [
    "Shampoos for white coats",
    "Shampoos for black coats",
    "Shampoos for brown/red coats",
    "Shampoos for multi-colored coats"
  ],
  "Puppy shampoos": [
    "Gentle shampoos for puppies",
    "Tear-free shampoos for puppies"
  ],
  "Natural and organic shampoos": [
    "Vegan shampoos",
    "Eco-friendly shampoos",
    "Shampoos with essential oils",
    "Herbal shampoos"
  ],
  "Specialty shampoos": [
    "Whitening shampoos",
    "De-shedding shampoos",
    "De-matting shampoos",
    "Waterless shampoos",
    "Dry shampoos"
  ]
}

const categoryKeys : string[] = Object.keys(categories);



class ProductMockGenerator extends MockGenerator<ProductEntity>{
  generateMany(count:number): ProductEntity[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): ProductEntity {
    const category : string = faker.helpers.arrayElement(categoryKeys);

    const sub_category : string = faker.helpers.arrayElement((categories[category] ?? []) as string[] );


    return {
      id:faker.datatype.number(),
      created_at:faker.date.past().toString(),
      name:faker.name.firstName(),
      description:faker.name.jobTitle(),
      cost:faker.datatype.number(),
      updated_at:faker.date.past().toString(),
      category,
      sub_category,

    };
  }

}

export default ProductMockGenerator;
