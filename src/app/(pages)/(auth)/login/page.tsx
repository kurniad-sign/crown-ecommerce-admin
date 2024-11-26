import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

import { Heading, Text } from '~/components/atom';
import { LogoLight } from '~/components/icon';

import { FormLogin } from '~/features/auth/form-login';

export const metadata: Metadata = {
  title: 'Login | Crown',
  description: 'Please login to crown dashboard to continue.',
};

export default function LoginPage() {
  return (
    <div className="flex w-full min-w-60 max-w-[464px] flex-col items-center justify-center gap-y-10">
      <Card className="w-full gap-y-4 p-8">
        <CardHeader className="flex-col gap-4">
          <LogoLight />
          <div className="space-y-1 text-center">
            <Heading component="h2" variant="title-4">
              Sign in to your account
            </Heading>
            <Text size="small" className="text-office-brown-600">
              Use your email to sign in to your dashboard
            </Text>
          </div>
        </CardHeader>
        <CardBody>
          <FormLogin />
        </CardBody>
      </Card>
    </div>
  );
}
