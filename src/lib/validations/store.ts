import { z } from 'zod';

const storeSchema = z.object({
  name: z.string().min(1, { message: 'Store name is required' }),
  storeId: z.string().optional(),
});

type StoreSchema = z.infer<typeof storeSchema>;

export { storeSchema, type StoreSchema };
