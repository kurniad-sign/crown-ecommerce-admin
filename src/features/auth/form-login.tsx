'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { honoClient } from '~/lib/hono/client';
import { loginSchema, type LoginSchemaType } from '~/lib/validations/auth';

export function FormLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: LoginSchemaType) =>
      await honoClient.api.auth.login.$post({
        json: payload,
      }),
    onSuccess: () => {
      router.replace('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitLogin: SubmitHandler<LoginSchemaType> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-8">
      <div className="flex flex-col gap-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email Address"
              labelPlacement="outside"
              placeholder="Your email address"
              type="email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email && errors.email.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeOff className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <Eye className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password && errors.password.message}
              {...field}
            />
          )}
        />
      </div>
      <Button
        isDisabled={isPending}
        isLoading={isPending}
        type="submit"
        color="primary"
        className="font-medium"
        fullWidth
      >
        Log in
      </Button>
    </form>
  );
}
