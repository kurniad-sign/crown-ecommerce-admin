import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  // description: z.string().optional(),
  // category: z.string().min(1, { message: 'Category is required' }),
  // price: z.number().min(1, { message: 'Price is required' }),
  // stock: z.number().min(1, { message: 'Stock is required' }),
});

type ProductValidationSchema = z.infer<typeof productValidationSchema>;

export { productValidationSchema, type ProductValidationSchema };
