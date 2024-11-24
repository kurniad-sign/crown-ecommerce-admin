import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  parentId: z.string().optional(),
});

type CategorySchema = z.infer<typeof categorySchema>;

export { categorySchema, type CategorySchema };
