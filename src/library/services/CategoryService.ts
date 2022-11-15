import firestore from '@react-native-firebase/firestore';
import { auth } from './AuthService';
import uuid from 'react-native-uuid';
import { Category } from 'library/interfaces/Category';

/**
 * Inserts a new category in the database.
 *
 * @param category - A category.
 *
 * @beta
 */
export const createNewCategory = async (category: Category) => {
  const userId = auth.getCurrentUserId();
  const categoryId = uuid.v4() as string;

  const newCategory: Category = {
    ...category,
    id: categoryId,
    userId: userId,
  };

  firestore()
    .collection('categories')
    .doc(categoryId)
    .set(newCategory)
    .catch((err: any) => console.log(err));

  return newCategory;
};

/**
 * Gets all the categories in database of the current app user.
 *
 * @returns An array of {@link Category}
 *
 * @beta
 */
export const getCategories = async (): Promise<Category[]> => {
  const userId = auth.getCurrentUserId();

  const categories = await firestore()
    .collection('categories')
    .where('userId', '==', userId)
    .get();

  if (categories.docs) {
    return categories.docs.map((doc: any) => doc.data as Category);
  } else {
    return [];
  }
};

/**
 * Gets a category by its id.
 *
 * @param categoryId - The id of a category.
 * @returns An object of type {@link Category}
 */
export const getCategoryById = async (
  categoryId: string,
): Promise<Category | null> => {
  const categoryQuery = await firestore()
    .collection('categories')
    .where('id', '==', categoryId)
    .get();

  if (!categoryQuery.docs) {
    return {} as Category;
  } else {
    const category = (categoryQuery.docs[0] as any)._data as Category;
    return category;
  }
};

/**
 * Deletes a category by id.
 *
 * @param categoryId - The id of the category to delete.
 * @returns The deleted {@link Category} object.
 *
 * @beta
 */
export const deleteCategoryById = async (categoryId: string) => {
  const deletedCategory = await getCategoryById(categoryId);
  await firestore().collection('categories').doc(categoryId).delete();
  return deletedCategory;
};
