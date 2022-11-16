import {
  CATEGORIES,
  createRandomCategory,
} from '../../../__mocks__/factories/CategoryFactory';
import { Category } from '../../../src/library/interfaces/Category';
import { CategoryService } from '../../../src/library/services/CategoryService';
import { AuthService } from '../../../src/library/services/AuthService';

describe('Category service', () => {
  beforeAll(() => {
    const defaultUserStoredId = 'user1';

    const mockGetUserInStorage = jest.spyOn(
      AuthService.prototype as any,
      'getUserInStorage',
    );
    mockGetUserInStorage.mockImplementation(() =>
      Promise.resolve(defaultUserStoredId),
    );
  });

  it('Should create a new category', async () => {
    const categoryService = new CategoryService();
    const fakerCategory: Category = createRandomCategory();
    const category: Category = await categoryService.createNewCategory(
      fakerCategory,
    );

    expect(category.id).toBeDefined();
    expect(category.name).toBeDefined();
    expect(category.color).toBeDefined();
    expect(category.userId).toBeDefined();
  });

  it('Should return a collecion of categories', async () => {
    const service = new AuthService();
    const categoryService = new CategoryService();
    const userId = await service.getUserInStorage();

    const mockCreateNewCategory = jest.spyOn(
      CategoryService.prototype as any,
      'createNewCategory',
    );

    mockCreateNewCategory.mockImplementation(() => {});

    CATEGORIES.forEach(async category => {
      let newCategory = {
        ...category,
        userId,
      };
      await categoryService.createNewCategory(newCategory);
    });

    const mockGetCategories = jest.spyOn(
      CategoryService.prototype as any,
      'getCategories',
    );

    mockGetCategories.mockImplementation(() => Promise.resolve(CATEGORIES));
    const categories = await categoryService.getCategories();

    expect(mockGetCategories).toHaveBeenCalled();
    expect(mockCreateNewCategory).toBeCalledTimes(5);
    expect(categories.length).toBe(5);
  });

  it('Should return a especific category', async () => {
    const categoryService = new CategoryService();
    const fakerCategory = createRandomCategory();
    const category = await categoryService.createNewCategory(fakerCategory);
    const actualCategory = await categoryService.getCategoryById(
      `${category?.id}`,
    );

    expect(actualCategory).toBeDefined();
  });
});
