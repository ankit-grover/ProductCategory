import { connection } from './connection.js';
import { generateId } from './ids.js';

const getCategoryTable = () => connection.table('category');

export async function getCategories() {
    return await getCategoryTable().select();
  }
  
  export async function getCategory(id) {
    return await getCategoryTable().first().where({ id });
  }

  export async function createCategory({ name, parentCategoryId }) {
    const category = {
      id: generateId(),
      name,
      parentId: parentCategoryId,
    };
    await getCategoryTable().insert(category);
    return category;
  }
  
  export async function deleteCategory(id) {
    const category = await getCategoryTable().first().where({ id });
    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }
    await getCategoryTable().delete().where({ id });
    return category;
  }
  
  export async function updateCategory({ id, name, parentCategoryId }) {
    const category = await getCategoryTable().first().where({ id });
    if (!category) {
      throw new Error(`Category not found: ${id}`);
    }
    const updatedFields = { name,parentId: parentCategoryId};
    await getCategoryTable().update(updatedFields).where({ id });
    return getCategory(id);
  }