import { connection } from '../db/connection.js';

const { schema } = connection;

await schema.dropTableIfExists('category');
await schema.dropTableIfExists('product');

await schema.createTable('category', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('parentId').references('id').inTable('category').onDelete('CASCADE');
  });

await schema.createTable('product', (table) => {
    table.text('id').notNullable().primary();
    table.text('name').notNullable();
    table.text('description');
    table.float('price').notNullable();
    table.text('categoryId').notNullable().references('id').inTable('category').onDelete('CASCADE');
    table.integer('stock').notNullable();
    table.text('image'); // Add image field
  });

  await connection.table('category').insert([
    {
      id: 'f3YmenBZpK0o',
      name:'MEN'
    },
    {
        id: 'f3YwmnBZpK0o',
        name:'WOMEN'
    },
    {
        id: 'f3YtshBZpK0o',
        name:'T-Shirt',
        parentId: 'f3YmenBZpK0o'
    },
    {
        id: 'f3YtopBZpK0o',
        name:'Top',
        parentId: 'f3YwmnBZpK0o'
    },
    {
        id: 'f3YBagBZpK0o',
        name:'Bag',
        parentId: 'f3YwmnBZpK0o'
    },
  ]);
  await connection.table('product').insert([
    {
      id: 'FjcJCHJALA4i',
      name: 'Polo Neck T-Shirt',
      description: 'T-Shirt Polo Neck for Men.',
      price:499.90,
      categoryId: 'f3YtshBZpK0o',
      stock:20
    },
    {
      id: 'Gu7QW9LcnF5d',
      name: 'Crop Top',
      description: 'Crop Top for Women.',
      price:699.90,
      categoryId: 'f3YtopBZpK0o',
      stock:12
    },
    {
        id: 'Gu7QW9LcnYUg',
        name: 'Purse',
        description: 'Purse / Bag for Women.',
        price:899.90,
        categoryId: 'f3YBagBZpK0o',
        stock:15
      },
  ]);
  process.exit();