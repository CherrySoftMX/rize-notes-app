import {
  createNewCategory,
  getCategories,
  getCategoryById,
} from '../../../src/library/services/CategoryService';
import { Category } from '../../../src/library/interfaces/Category';
import { createRandomCategory } from '../../../__mocks__/factories/CategoryFactory';

describe('Category service', () => {
  it('Should create a new category', async () => {
    const fakerCategory: Category = createRandomCategory();
    const category: Category = await createNewCategory(fakerCategory);

    expect(category.id).toBeDefined();
    expect(category.name).toBeDefined();
    expect(category.color).toBeDefined();
    expect(category.userId).toBeDefined();
  });

  it('Should return empty collection of categories', async () => {
    const actualCategories = await getCategories();

    expect(actualCategories).toBeDefined();
    expect(actualCategories).toHaveLength(0);
  });

  it('Should return a especific category', async () => {
    const fakerCategory = createRandomCategory();
    const category = await createNewCategory(fakerCategory);
    const actualCategory = await getCategoryById(`${category.id}`);

    expect(actualCategory).toBeDefined();
  });
});
