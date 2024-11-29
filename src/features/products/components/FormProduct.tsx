'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Save } from 'lucide-react';

import { Form, FormField } from '~/components/atom/Form';
import {
  productValidationSchema,
  type ProductValidationSchema,
} from '~/lib/validations/products';

export function FormProduct() {
  const onSubmitProduct = async (payload: ProductValidationSchema) => {
    console.log(payload);
  };

  return (
    <Form
      id="form-product"
      onSubmit={onSubmitProduct}
      schema={productValidationSchema}
      className="mt-5"
    >
      {({ control, formState: { errors } }) => (
        <Card>
          <CardBody>
            <FormField
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  isRequired
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter your product name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name && errors.name.message}
                  {...field}
                />
              )}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              startContent={<Save size={14} strokeWidth={2} />}
              className="font-medium"
            >
              Save Product
            </Button>
          </CardFooter>
        </Card>
      )}
    </Form>
  );
}
