import { connection } from './connection.js';
import { generateId } from './ids.js';

const getProductTable = () => connection.table('product');

export async function getProducts() {
    return await getProductTable().select();
  }
  
  export async function getProduct(id) {
    return await getProductTable().first().where({ id });
  }

  export async function createProduct({ name, description,categoryId, stock, price }) {
    const product = {
      id: generateId(),
      name,
      description,
      price,
      categoryId,
      stock,
    };
    await getProductTable().insert(product);
    return product;
  }
  
  export async function deleteProduct(id) {
    const product = await getProductTable().first().where({ id });
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    await getProductTable().delete().where({ id });
    return product;
  }
  
  export async function updateProduct({ id, name, description,categoryId, stock, price }) {
    const product = await getProductTable().first().where({ id });
    if (!product) {
      throw new Error(`Product not found: ${id}`);
    }
    const updatedFields = { name, description,price,categoryId,stock };
    await getProductTable().update(updatedFields).where({ id });
    return getProduct(id);
  }