import { faker } from '@faker-js/faker';
import { Category } from '../../src/library/interfaces/Category';

export const CATEGORIES: Category[] = [];

export function createRandomCategory(userId?: string): Category {
  return {
    id: faker.datatype.uuid(),
    userId: userId || faker.datatype.uuid(),
    name: `${faker.word.verb()}`,
    color: faker.internet.color(),
  };
}

Array.from({ length: 5 }).forEach(() => {
  CATEGORIES.push(createRandomCategory());
});
