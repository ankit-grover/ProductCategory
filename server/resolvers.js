import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./db/categoryQueries.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./db/productQueries.js";


export const resolvers = {
    Query: {
        products: () => getProducts(),
        categories: () => getCategories(),
        product: async (_root, { id }) => {
            const product = await getProduct(id);
            if (!product) {
              throw notFoundError('No Product found with id ' + id);
            }
            return product;
          },
        category: async (_root, { id }) => {
            const category = await getCategory(id);
            if (!category) {
              throw notFoundError('No Category found with id ' + id);
            }
            return category;
          }
    },
    Product : {
      category: (product) => getCategory(product.categoryId),
    },
    Category : {
      parentCategory: (category) => {
        if(!category.parentId) {
          return null;
        }
        return getCategory(category.parentId);
      },
    },
    Mutation: {
        createProduct: (_root, { input: { name, description, categoryId, stock, price } }) => {
          return createProduct({ name, description,categoryId,stock,price });
        },
        deleteProduct: (_root, { id }) => deleteProduct(id),
        updateProduct: (_root, { input: { id, name, description, categoryId, stock, price } }) => {
            return updateProduct({ id, name, description, categoryId, stock, price });
        },
        createCategory: (_root, { input: { name, parentCategoryId } }) => {
            return createCategory({ name, parentCategoryId });
        },
          deleteCategory: (_root, { id }) => deleteCategory(id),
          updateCategory: (_root, { input: { id, name, parentCategoryId } }) => {
              return updateCategory({ id, name, parentCategoryId });
        },
      },
};