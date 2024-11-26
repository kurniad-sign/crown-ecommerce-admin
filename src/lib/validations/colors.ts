import { z } from 'zod';

const colorValidationSchema = z.object({
  name: z.string().min(1, { message: 'Size name is required' }),
  hex_code: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: 'Invalid hex color code' }),
});

const colorQueryPostValidation = z.object({
  storeId: z.string().min(1),
});

type ColorValidationSchema = z.infer<typeof colorValidationSchema>;

export {
  colorValidationSchema,
  colorQueryPostValidation,
  type ColorValidationSchema,
};
