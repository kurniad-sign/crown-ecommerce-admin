import { z } from 'zod';

const sizeValidationSchema = z.object({
  name: z.string().min(1, { message: 'Size name is required' }),
  value: z.string().min(1, { message: 'Size value is required' }),
});

const sizeQueryPostValidation = z.object({
  storeId: z.string().min(1),
});

type SizeValidationSchema = z.infer<typeof sizeValidationSchema>;

export {
  sizeValidationSchema,
  sizeQueryPostValidation,
  type SizeValidationSchema,
};
